import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { BIP32Factory } from "bip32";
import ecc from "@bitcoinerlab/secp256k1";
import { BLOCKCHAIN_API_URL } from "@/lib/config";

bitcoin.initEccLib(ecc);

export interface WalletCheckResult {
  used: boolean;
  address: string;
  balance?: string;
  txCount?: number;
  lastSeen?: string;
}

export interface BlockchainAPIResponse {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  first_seen?: string;
  last_seen?: string;
}

export interface WordReplacement {
  originalWord: string;
  newWord: string;
  category: string;
  index: number;
}

export interface ValidSentence {
  sentence: string;
  replacements: WordReplacement[];
}

export class BitcoinAddressChecker {
  public static async validateMnemonic(phrase: string): Promise<boolean> {
    return bip39.validateMnemonic(phrase);
  }

  private static async tryWordReplacement(
    words: string[],
    index: number,
    replacement: string
  ): Promise<boolean> {
    const newWords = [...words];
    newWords[index] = replacement;
    const newPhrase = newWords.join(" ");
    return await bip39.validateMnemonic(newPhrase);
  }

  public static async findValidVariations(
    sentence: string
  ): Promise<ValidSentence[]> {
    const words = sentence.toLowerCase().trim().split(/\s+/);
    const validVariations: ValidSentence[] = [];

    // Check one word replacement at a time
    for (let i = 0; i < words.length; i++) {
      const originalWord = words[i];
      // Try replacing with similar BIP39 words
      const similarWords = Array.from(new Set([
        ...this.findSimilarWords(originalWord, 2)
      ]));

      for (const newWord of similarWords) {
        if (newWord !== originalWord) {
          try {
            const isValid = await this.tryWordReplacement(words, i, newWord);
            if (isValid) {
              const newWords = [...words];
              newWords[i] = newWord;
              validVariations.push({
                sentence: newWords.join(" "),
                replacements: [
                  {
                    originalWord,
                    newWord,
                    category: 'bip39',
                    index: i,
                  },
                ],
              });
            }
          } catch (error) {
            console.error("Error trying word replacement:", error);
          }
        }
      }
    }

    // Sort by number of replacements (prefer fewer changes)
    return validVariations.sort(
      (a, b) => a.replacements.length - b.replacements.length
    );
  }

  private static findSimilarWords(word: string, maxDistance: number): string[] {
    const similar: string[] = [];
    const bip39Words = bip39.wordlists.english;

    for (const candidate of bip39Words) {
      if (this.levenshteinDistance(word, candidate) <= maxDistance) {
        similar.push(candidate);
      }
    }

    return similar;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    return track[str2.length][str1.length];
  }

  public static async deriveAddress(
    seedPhrase: string,
    accountIndex = 0,
    addressIndex = 0
  ): Promise<string> {
    if (!(await bip39.validateMnemonic(seedPhrase))) {
      const validVariations = await this.findValidVariations(seedPhrase);
      if (validVariations.length > 0) {
        throw new Error(
          `Invalid BIP39 mnemonic phrase. Try these alternatives instead:\n${validVariations
            .slice(0, 3)
            .map(
              (v) =>
                `- ${v.sentence}\n  (Replace ${v.replacements
                  .map((r) => `"${r.originalWord}" with "${r.newWord}"`)
                  .join(", ")})`
            )
            .join("\n")}`
        );
      }
      throw new Error("Invalid BIP39 mnemonic phrase - try generating a new one");
    }

    try {
      const seed = await bip39.mnemonicToSeed(seedPhrase);
      const bip32 = BIP32Factory(ecc);
      const root = bip32.fromSeed(seed);
      const path = `m/44'/0'/${accountIndex}'/0/${addressIndex}`;
      const child = root.derivePath(path);
      const pubkeyBuffer = Buffer.from(child.publicKey);
      const { address } = bitcoin.payments.p2pkh({
        pubkey: pubkeyBuffer,
      });

      if (!address) {
        throw new Error("Failed to derive Bitcoin address");
      }

      return address;
    } catch (error) {
      console.error("Error deriving address:", error);
      throw error;
    }
  }

  public static async checkAddress(
    address: string
  ): Promise<WalletCheckResult> {
    try {
      const response = await fetch(`${BLOCKCHAIN_API_URL}/${address}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blockchain data");
      }

      const data = (await response.json()) as BlockchainAPIResponse;

      return {
        used: data.n_tx > 0,
        address: data.address,
        balance: (data.final_balance / 100000000).toFixed(8),
        txCount: data.n_tx,
        lastSeen: data.last_seen,
      };
    } catch (error) {
      console.error("Error checking address:", error);
      throw error;
    }
  }

  public static async checkSeedPhrase(
    seedPhrase: string
  ): Promise<WalletCheckResult> {
    try {
      const address = await this.deriveAddress(seedPhrase);
      return await this.checkAddress(address);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to check seed phrase");
    }
  }
}