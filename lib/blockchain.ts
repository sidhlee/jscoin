import SHA256 from 'crypto-js/sha256';
// const SHA256 = require('crypto-js/sha256');

class Transaction {
  /**
   *
   * @param input address of the wallet from which the coin is sent
   * @param output address of the wallet to which the coin is sent
   * @param amount
   */
  constructor(
    public input: string | null,
    public output: string,
    public amount: number
  ) {}
}

class Block {
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

  createTransaction(transaction: Transaction) {
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
    // 1. if any attribute is tampered i.e. is the hash valid?
    //  - re-calculate the hash based on the current attributes and match that to the existing hash
    // 2. if the hash is overwritten with re-calculated hash based on tampered attributes
    //  - hash might be valid but will not match next block's prevHash

    // What if the attacker tamper the last block and recalculate the hash?
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      const isHashValid = currentBlock.hash === currentBlock.calcHash();
      const isChainValid = currentBlock.prevHash === prevBlock.hash;

      if (!isHashValid) return false;
      if (!isChainValid) return false;
    }
    return true;
  }
}

let jsCoin = new Blockchain();

jsCoin.createTransaction(new Transaction('address1', 'address2', 100));
jsCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the mining...');
jsCoin.minePendingTransactions('avid_investor');

console.log(
  '\nBalance of avid_investor is',
  jsCoin.getBalanceOfAddress('avid_investor')
);

console.log('\n Starting the mining again...');
jsCoin.minePendingTransactions('bot27');
console.log(
  '\nBalance of avid_investor is',
  jsCoin.getBalanceOfAddress('avid_investor')
);
