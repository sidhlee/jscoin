import { ec as EC } from 'elliptic';

// Create an elliptic curve for bitcoin wallet
const ec = new EC('secp256k1');

// Create keys for signing transactions and verifying balance in our wallet
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log({ privateKey, publicKey });
/* 
{
  privateKey: 'd635c4448025e7e14d5afd6eb79f910d8b0b331819592564f7daf09ed7b42d77',
  publicKey: '042c58e523f63462a5e152a6a0aec962facd0bd9947273f40f3e2a40abe56d8867a7efb4d1c27f086c3498ccdfc0e820d96d90dd0d66c5c91a1233b3d1ca7bd163'
}
*/
