import { Block } from '..';
import { createSignedTransaction } from './helpers';

console.log('blocktest');

let block: Block;
beforeEach(() => {
  block = new Block(1000, [createSignedTransaction()], 'a1');
});

describe('Block class', () => {
  describe('Constructor', () => {
    it('should create correct fields', () => {
      expect(block.prevHash).toBe('a1');
    });
  });
});
