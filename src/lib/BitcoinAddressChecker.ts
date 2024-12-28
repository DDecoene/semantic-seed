import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { BIP32Factory } from "bip32";
import ecc from "@bitcoinerlab/secp256k1";
import { BLOCKCHAIN_API_URL } from "@/lib/config";
import WordListManager from "./WordListManager";

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
    const wordListManager = WordListManager.getInstance();
    const words = sentence.toLowerCase().trim().split(/\s+/);
    const validVariations: ValidSentence[] = [];

    // Check one word replacement at a time
    for (let i = 0; i < words.length; i++) {
      const originalWord = words[i];
      const categories = wordListManager.getCategoriesForWord(originalWord);

      for (const category of categories) {
        const alternativeWords = wordListManager.getWordsForCategory(category);

        for (const newWord of alternativeWords) {
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
                      category,
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
    }

    // Sort by number of replacements (prefer fewer changes)
    return validVariations.sort(
      (a, b) => a.replacements.length - b.replacements.length
    );
  }

  /**
   * Derives a Bitcoin address from a BIP39 mnemonic phrase
   */
  public static async deriveAddress(
    seedPhrase: string,
    accountIndex = 0,
    addressIndex = 0
  ): Promise<string> {
    // Validate the mnemonic first
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
      throw new Error(
        "Invalid BIP39 mnemonic phrase - try generating a new one"
      );
    }

    try {
      // Generate seed from mnemonic
      const seed = await bip39.mnemonicToSeed(seedPhrase);

      // Derive the root node
      const bip32 = BIP32Factory(ecc);
      const root = bip32.fromSeed(seed);

      // Derive the first account's external chain node
      // m/44'/0'/accountIndex'/0/addressIndex
      const path = `m/44'/0'/${accountIndex}'/0/${addressIndex}`;
      const child = root.derivePath(path);

      // Generate address from public key
      const publicKeyBuffer = Buffer.from(child.publicKey);
      const { address } = bitcoin.payments.p2pkh({
        pubkey: publicKeyBuffer,
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

  /**
   * Checks if a Bitcoin address has been used on the blockchain
   * 
   * WARNING: this does go out to the internet with the seed phrase. It's a big risk
   *  to use this seed phrase after this in a real wallet. This key could be leaked.
   *  This is just for fun.
   */
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
        balance: (data.final_balance / 100000000).toFixed(8), // Convert satoshis to BTC
        txCount: data.n_tx,
        lastSeen: data.last_seen,
      };
    } catch (error) {
      console.error("Error checking address:", error);
      throw error;
    }
  }

  /**
   * Derives an address from a seed phrase and checks its usage
   */
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
