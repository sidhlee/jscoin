import { Block, Blockchain } from '../index';
import { getSignedTransaction, getMinedBlockchain, publicKey } from './helpers';

let blockchain: Blockchain;

beforeEach(() => {
  blockchain = new Blockchain();
});

describe('Blockchain class', () => {
  describe('constructor', () => {
    it('initializes fields correctly', () => {
      const { difficulty, pendingTransactions, miningReward, chain } =
        blockchain;

      expect(difficulty).toBe(2);
      expect(pendingTransactions).toEqual([]);
      expect(miningReward).toBe(6.25);
      // check for genesis block
      expect(chain.length).toBeGreaterThanOrEqual(1);
      expect(chain[0]).toBeInstanceOf(Block);
      expect(chain[0].transactions.length).toBe(0);
    });
  });

  describe('addTransaction', () => {
    it('should add transaction if it is valid', () => {
      // 6.25 reward given to the testKey
      const blockchain = getMinedBlockchain();

      // input: testKey, output: 'wallet2', amount: 1
      const validTransaction = getSignedTransaction(1);

      try {
        blockchain.addTransaction(validTransaction);
      } catch (err) {
        console.log(err);
      }

      expect(blockchain.pendingTransactions[0]).toBe(validTransaction);
    });

    it('should not add transaction without input', () => {
      const transaction = getSignedTransaction();
      // input can have null value for the mining reward
      transaction.input = null;
      try {
        blockchain.addTransaction(transaction);
      } catch (err) {}

      expect(blockchain.pendingTransactions.length).toBe(0);
    });

    it('should not add transaction without output', () => {
      const transaction = getSignedTransaction();
      // output has only the type of string
      transaction.output = '';
      try {
        blockchain.addTransaction(transaction);
      } catch (err) {}

      expect(blockchain.pendingTransactions.length).toBe(0);
    });

    it('should not add transaction when balance is not enough', () => {
      const transaction = getSignedTransaction(10000);
      try {
        blockchain.addTransaction(transaction);
      } catch (err) {}

      expect(blockchain.pendingTransactions.length).toBe(0);
    });

    it('should not add transaction when amount <= 0', () => {
      const transaction = getSignedTransaction(-1);
      try {
        blockchain.addTransaction(transaction);
      } catch (err) {}

      expect(blockchain.pendingTransactions.length).toBe(0);
    });
  });

  describe('Wallet balance', () => {
    it('should receive mining rewards', () => {
      // create blockchain and mine to give reward to test address
      const blockchain = getMinedBlockchain();

      // add transactions to blockchain and mine to give reward to testWallet
      const transaction = getSignedTransaction(1);
      blockchain.addTransaction(transaction);
      blockchain.addTransaction(transaction);
      blockchain.minePendingTransactions('testWallet');

      // check balance of the address that received mining reward
      const balance = blockchain.getBalanceOfAddress('testWallet');
      const miningReward = blockchain.miningReward;
      expect(balance).toBe(miningReward);
    });

    it('should calculate correct balance after transaction', () => {
      // create blockchain and mine to give reward to test address
      const blockchain = getMinedBlockchain();

      // add transactions to blockchain and mine to give reward to testWallet
      const transaction = getSignedTransaction(1);
      blockchain.addTransaction(transaction);
      blockchain.addTransaction(transaction);
      blockchain.minePendingTransactions('testWallet');

      // check balance of the test address
      const balance = blockchain.getBalanceOfAddress(publicKey);
      const expectedBalance = blockchain.miningReward - 2 * 1;
      expect(balance).toBe(expectedBalance);
    });
  });
});
