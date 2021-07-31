# JS Coin

A Next.js app for managing blockchain transactions.

## Validating the blockchain

- Compare the existing hash with re-calculated hash. This ensures that any attributes on the current block has not been tampered.
- Check the integrity of the chain by matching current block's previous hash with the previous block's hash.

### What if the attacker tamper the last block and overwrite the hash with re-calculated one (or do the same to the last n blocks)?

The proof of work makes it unfeasible to temper the last block and find the golden nonce once again.

- [Answer 1](https://bitcoin.stackexchange.com/questions/79258/how-to-protect-the-latest-block-in-block-chain-be-tampered)
- [Answer 2](https://bitcoin.stackexchange.com/questions/71855/tampering-with-the-last-block)

## Nonce (Number Only Used Once)

A random number used to hash valid proof of work.
