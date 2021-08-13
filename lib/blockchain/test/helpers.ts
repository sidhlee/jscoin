import { ec as EC } from 'elliptic';
import { Blockchain, Transaction } from '..';

const ec = new EC('secp256k1');

const privateKey =
  'd635c4448025e7e14d5afd6eb79f910d8b0b331819592564f7daf09ed7b42d77';

export const key = ec.keyFromPrivate(privateKey);
export const publicKey = key.getPublic('hex');

export function getSignedTransaction(amount = 10) {
  // Create transaction with input, output, and the amount
  const transaction = new Transaction(publicKey, 'wallet2', amount);
  // Then sign it with the public-secret key pair
  transaction.sign(key);

  return transaction;
}

/** create blockchain with empty transaction and mine to give 6.25 reward to test address */
export function getMinedBlockchain() {
  const blockchain = new Blockchain();
  // reward (6.25) is given to the provided address
  blockchain.minePendingTransactions(publicKey);

  return blockchain;
}
