# JS Coin

A Next.js app for managing blockchain transactions.

## Validating the blockchain

- Compare the existing hash with re-calculated hash. This ensures that any attributes on the current block has not been tampered.
- Check the integrity of the chain by matching current block's previous hash with the previous block's hash.

### What if the attacker tamper the last block and overwrite the hash with re-calculated one (or do the same to the last n blocks)?

The proof of work makes it unfeasible to temper the last block and find the golden nonce once again from the scratch.

- [Answer 1](https://bitcoin.stackexchange.com/questions/79258/how-to-protect-the-latest-block-in-block-chain-be-tampered)
- [Answer 2](https://bitcoin.stackexchange.com/questions/71855/tampering-with-the-last-block)

## Nonce (Number Only Used Once)

A random number used to hash valid proof of work.

## Transaction

- Bitcoin uses its proof of work algorithm to create one new block every 10 minutes.
- All the transactions made in between blocks are temporarily stored in the transactions array, pending to be included in the next block.
- Miners choose which transaction to include in their block, and this is usually done by sorting transactions by fee and size to maximize their profit within 1mb block size limit. Therefore, transaction with higher fee will likely be included in the block quicker in order to be validated and confirmed.

## Mining Reward

Mining reward is added to the pending transaction, so it is not sent until it's included in a new block and validated.

## Transaction Signature

A unique signature is created for each transaction based on:

- Transaction Data: hashed from input, output, and amount
- Wallet Key: public & private

## Validating Transaction

We have the following ingredient to validate the transaction:

- Input address - public key of the sender is derived from the input
- Hash - recalculated at the time of verification to ensure the transaction is not
- Signature - signed with provided key and hashed transaction

We'll validate mining reward as a valid transaction even though it doesn't have input address.

## References

- [How do bitcoin transactions work?](https://www.coindesk.com/learn/bitcoin-101/how-do-bitcoin-transactions-work)
