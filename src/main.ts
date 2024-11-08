import { TypeormDatabase } from '@subsquid/typeorm-store'
import { Mint } from './model'
import { processor } from './processor'

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
    const mints: Mint[] = []

    ctx.log.info(`Blocks: ${ctx.blocks.length}`)
    for (let c of ctx.blocks) {
        ctx.log.info(`Transactions: ${c.transactions.length}`)
        for (let tx of c.transactions) {
            mints.push(
                new Mint({
                    id: tx.id,
                    block: c.header.height,
                    address: tx.to,
                    value: tx.value,
                    txHash: tx.hash,
                    from: tx.from,
                })
            )
        }
    }
    // apply vectorized transformations and aggregations
    const startBlock = ctx.blocks.at(0)?.header.height
    const endBlock = ctx.blocks.at(-1)?.header.height
    const minted = mints.reduce((acc, m) => acc + m.value, 0n) / 1_000_000_000n
    ctx.log.info(`Mints ${minted} from ${startBlock} to ${endBlock}`)
    // upsert batches of entities with batch-optimized ctx.store.insert()/upsert()
    await ctx.store.insert(mints)
})
