import SHA256 from 'crypto-js/sha256';
import { ec as EC, SignatureInput } from 'elliptic';

const ec = new EC('secp256k1');

// const SHA256 = require('crypto-js/sha256');

export class Transaction {
  private signature: SignatureInput;

  /**
   *
   * @param input address(public key) of the sender wallet(spender)
   * @param output address(public key) of the receiver wallet
   * @param amount
   */
  constructor(
    public input: string | null,
    public output: string,
    public amount: number
  ) {
    this.signature = [];
  }

  /** Create and store signature based on the hash (function of transaction info) and key */
  sign(key: EC.KeyPair) {
    if (key.getPublic('hex') !== this.input) {
      throw new Error('You cannot sign transactions for other wallet.');
    }

    const hash = this.calcHash();
    const signature = key.sign(hash, 'base64');
    // DER encoded signature in array
    this.signature = signature.toDER('hex');
  }

  isValid() {
    // Validate mining reward that doesn't have input
    if (this.input === null) return true;

    if (!this.hasSignature()) {
      throw new Error('No signature in this transaction.');
    }

    // import public key
    const publicKey = ec.keyFromPublic(this.input, 'hex');

    // Verify transaction with the key, signature and recalculated hash
    return publicKey.verify(this.calcHash(), this.signature);
  }

  /** Calculate hash based on input & output address and amount  */
  private calcHash() {
    return SHA256(this.input + this.output + this.amount).toString();
  }

  private hasSignature() {
    if (this.signature) return true;

    if (Array.isArray(this.signature) && this.signature.length > 0) {
      return true;
    }

    return false;
  }
}

export class Block {
  public hash: string;
  public nonce: number;
  constructor(
    // The order of the block is determined by their array index, not with the index we pass
    // public index: number,
    public timestamp: number,
    public transactions: Transaction[],
    public prevHash: string = ''
  ) {
    // calc new hash when creating new block
    this.hash = this.calcHash();
    this.nonce = 0;
  }

  calcHash() {
    return SHA256(
      this.prevHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mine(difficulty: number) {
    // re-calculate & update hash until it meets the given proof of work
    while (!this.isPOWValid(difficulty)) {
      this.nonce++;
      this.hash = this.calcHash();
    }

    console.log('Block mined: ' + this.hash);
  }

  /** Check if the hash satisfies the proof of work */
  private isPOWValid(difficulty: number) {
    return this.hash.substring(0, difficulty) === '0'.repeat(difficulty);
  }

  /** Validate all the transactions of the block */
  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }
}

export class Blockchain {
  public chain: Block[] = [this.createGenesisBlock()];
  public pendingTransactions: Transaction[] = [];
  private difficulty = 2;
  public miningReward = 100;
  constructor() {}

  createGenesisBlock() {
    return new Block(new Date('2021-08-01').getTime(), [], '0');
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string) {
    // In real life, adding all the pending transactions are not possible because there are too many for 1mb block size limit.
    // So miners get to choose which transactions to include
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mine(this.difficulty);

    console.log('Block successfully mined');
    this.chain.push(block);

    // clear pending transactions
    this.pendingTransactions = [
      // there is no input for mine reward
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  addTransaction(transaction: Transaction) {
    if (!transaction.input || !transaction.output) {
      throw new Error('Transaction must include input and output');
    }
    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction to chain');
    }
    this.pendingTransactions.push(transaction);
  }

  /**
   * Go through all blocks in the chain to calculate balance
   */
  getBalanceOfAddress(address: string) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        // coin spent, take amount off from balance
        if (trans.input === address) {
          balance -= trans.amount;
        }
        // coin received, add amount to the balance
        if (trans.output === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isValid() {
    // Go through all added blocks and check:
    // 1. Do all the blocks have valid transactions?
    // 2. if any attribute is tampered i.e. is the hash valid?
    //  - re-calculate the hash based on the current attributes and match that to the existing hash
    // 3. if the hash is overwritten with re-calculated hash based on tampered attributes
    //  - hash might be valid but will not match next block's prevHash

    // What if the attacker tamper the last block and recalculate the hash?
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      const isHashValid = currentBlock.hash === currentBlock.calcHash();
      const isChainValid = currentBlock.prevHash === prevBlock.hash;

      if (!isHashValid) return false;
      if (!isChainValid) return false;
    }
    return true;
  }
}

// let jsCoin = new Blockchain();

// jsCoin.addTransaction(new Transaction('address1', 'address2', 100));
// jsCoin.addTransaction(new Transaction('address2', 'address1', 50));

// console.log('\n Starting the mining...');
// jsCoin.minePendingTransactions('avid_investor');

// console.log(
//   '\nBalance of avid_investor is',
//   jsCoin.getBalanceOfAddress('avid_investor')
// );

// console.log('\n Starting the mining again...');
// jsCoin.minePendingTransactions('bot27');
// console.log(
//   '\nBalance of avid_investor is',
//   jsCoin.getBalanceOfAddress('avid_investor')
// );
