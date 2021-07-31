import SHA256 from 'crypto-js/sha256';
// const SHA256 = require('crypto-js/sha256');

class Block {
  public hash: string;
  public nonce: number;
  constructor(
    public index: number,
    public timestamp: string,
    public data: any,
    public prevHash: string = ''
  ) {
    // calc new hash when creating new block
    this.hash = this.calcHash();
    this.nonce = 0;
  }

  calcHash() {
    return SHA256(
      this.index +
        this.prevHash +
        this.timestamp +
        JSON.stringify(this.data) +
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
  public chain: Block[];
  private difficulty: number;
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, '2021-08-01', 'Genesis Block', '0');
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block) {
    // Update new block's prevHash and hash based on the last block, then add it to the chain

    // Take last block's hash and add it to new block as prevHash
    newBlock.prevHash = this.getLastBlock().hash;
    // Then re-calc new block's hash because prevHash is one of the inputs that the hash is based on
    newBlock.mine(this.difficulty);

    this.chain.push(newBlock);
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
console.log('Mining block 1..');
jsCoin.addBlock(new Block(1, '2021-08-01', { amount: 4 }));
console.log('Mining block 2..');
jsCoin.addBlock(new Block(2, '2021-08-02', { amount: 10 }));

// jsCoin.chain[2].data = { amount: 999 };
// jsCoin.chain[2].hash = jsCoin.chain[2].calcHash();

// console.log(JSON.stringify(jsCoin, null, 4));
// console.log('Is blockchain valid? ' + jsCoin.isValid());
