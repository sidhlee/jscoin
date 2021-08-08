import { ec as EC } from 'elliptic';
import { Transaction } from '..';

const ec = new EC('secp256k1');

const key = ec.keyFromPrivate(
  'd635c4448025e7e14d5afd6eb79f910d8b0b331819592564f7daf09ed7b42d77'
);

export function createSignedTransaction(amount = 10) {
  console.debug('hey');
  const transaction = new Transaction(key.getPublic('hex'), 'wallet2', amount);
  transaction.sign(key);

  return transaction;
}
