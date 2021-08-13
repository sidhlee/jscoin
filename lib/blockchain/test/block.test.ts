import { Block } from '..';
import { getSignedTransaction } from './helpers';
import SHA256 from 'crypto-js/sha256';

let block: Block;
beforeEach(() => {
  // Including one transaction for testing.
  block = new Block(1000, [getSignedTransaction()], 'a1');
});

describe('Block class', () => {
  describe('Constructor', () => {
    it('should create correct fields', () => {
      expect(block.prevHash).toBe('a1');
      expect(block.timestamp).toBe(1000);
      expect(block.transactions).toEqual([getSignedTransaction()]);
      expect(block.nonce).toBe(0);
    });
  });

  it('should create fields without passing prev hash', () => {
    block = new Block(1000, [getSignedTransaction()]);
    expect(block.prevHash).toBe('');
    expect(block.timestamp).toBe(1000);
    expect(block.transactions).toEqual([getSignedTransaction()]);
    expect(block.nonce).toBe(0);
  });

  describe('calcHash', () => {
    it('should give correct hash', () => {
      const hash = block.calcHash();
      const expected = SHA256(
        block.prevHash +
          block.timestamp +
          JSON.stringify(block.transactions) +
          block.nonce
      ).toString();

      expect(hash).toBe(expected);
    });

    it('should change when transaction is tempered', () => {
      const hash = block.calcHash();
      block.transactions = [getSignedTransaction(100)];
      const temperedHash = block.calcHash();

      expect(hash).not.toBe(temperedHash);
    });
  });

  describe('hasValidTransaction', () => {
    it('should return true when all transactions are valid', () => {
      block.transactions = [
        getSignedTransaction(2),
        getSignedTransaction(5),
        getSignedTransaction(),
      ];

      expect(block.hasValidTransactions()).toBe(true);
    });

    it('should return false when some transactions invalidates', () => {
      const temperedTransaction = getSignedTransaction(1);
      temperedTransaction.amount = 1000;
      // Recalculated hash is different from the hash used to sign the transaction
      block.transactions = [getSignedTransaction(), temperedTransaction];

      expect(block.hasValidTransactions()).toBe(false);
    });
  });
});
