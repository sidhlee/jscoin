import { ec as EC } from 'elliptic';
import { Transaction } from '..';

const ec = new EC('secp256k1');

const key = ec.keyFromPrivate(
  'd635c4448025e7e14d5afd6eb79f910d8b0b331819592564f7daf09ed7b42d77'
);

export function createSignedTransaction(amount = 10) {
  // Create transaction with input, output, and the amount
  const transaction = new Transaction(key.getPublic('hex'), 'wallet2', amount);
  // Then sign it with the public-secret key pair
  transaction.sign(key);

  return transaction;
}
