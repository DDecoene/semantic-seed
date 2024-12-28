import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import ecc from '@bitcoinerlab/secp256k1';
import { BLOCKCHAIN_API_URL } from '@/lib/config';

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

export class BitcoinAddressChecker {
  /**
   * Derives a Bitcoin address from a BIP39 mnemonic phrase
   * @param seedPhrase - The BIP39 mnemonic phrase
   * @param accountIndex - The account index (default: 0)
   * @param addressIndex - The address index (default: 0)
   * @returns The derived Bitcoin address
   */
  static deriveAddress(
    seedPhrase: string,
    accountIndex = 0,
    addressIndex = 0
  ): string {
    // Validate the mnemonic
    if (!bip39.validateMnemonic(seedPhrase)) {
      throw new Error('Invalid BIP39 mnemonic phrase');
    }

    try {
      // Generate seed from mnemonic
      const seed = bip39.mnemonicToSeedSync(seedPhrase);
      
      // Derive the root node
      const bip32 = BIP32Factory(ecc);
      const root = bip32.fromSeed(seed);
      
      // Derive the first account's external chain node
      // m/44'/0'/accountIndex'/0/addressIndex
      const path = `m/44'/0'/${accountIndex}'/0/${addressIndex}`;
      const child = root.derivePath(path);
      
      // Generate address from public key
      const { address } = bitcoin.payments.p2pkh({ 
        pubkey: Buffer.from(child.publicKey) 
      });
      
      if (!address) {
        throw new Error('Failed to derive Bitcoin address');
      }

      return address;
    } catch (error) {
      console.error('Error deriving address:', error);
      throw new Error('Failed to derive Bitcoin address');
    }
  }

  /**
   * Checks if a Bitcoin address has been used on the blockchain
   * @param address - The Bitcoin address to check
   * @returns Promise resolving to the check result
   */
  static async checkAddress(address: string): Promise<WalletCheckResult> {
    try {
      const response = await fetch(`${BLOCKCHAIN_API_URL}/${address}`);

      if (!response.ok) {
        throw new Error('Failed to fetch blockchain data');
      }

      const data = await response.json() as BlockchainAPIResponse;

      return {
        used: data.n_tx > 0,
        address: data.address,
        balance: (data.final_balance / 100000000).toFixed(8), // Convert satoshis to BTC
        txCount: data.n_tx,
        lastSeen: data.last_seen
      };
    } catch (error) {
      console.error('Error checking address:', error);
      throw new Error('Failed to check address on blockchain');
    }
  }

  /**
   * Derives an address from a seed phrase and checks its usage
   * @param seedPhrase - The BIP39 mnemonic phrase
   * @returns Promise resolving to the check result
   */
  static async checkSeedPhrase(seedPhrase: string): Promise<WalletCheckResult> {
    const address = this.deriveAddress(seedPhrase);
    return await this.checkAddress(address);
  }
}