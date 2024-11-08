import { assertNotNull } from '@subsquid/util-internal'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'

export const processor = new EvmBatchProcessor()
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/evm-indexing/supported-networks/
    // .setGateway('https://v2.archive.subsquid.io/network/ethereum-mainnet')
    // Chain RPC endpoint is required for
    //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
    //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
    .setRpcEndpoint({
        // Set the URL via .env for local runs or via secrets when deploying to Subsquid Cloud
        // https://docs.subsquid.io/deploy-squid/env-variables/
        url: assertNotNull(process.env.RPC_ETH_HTTP, 'No RPC endpoint supplied'),
        // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
        rateLimit: 20
    })
    .setFinalityConfirmation(300)
    .setFields({
        transaction: {
            from: true,
            to: true,
            value: true,
            hash: true,
            block: true,
        },
    })
    // .setBlockRange({
    //     from: 8413669,
    //     to: 9715223
    // from: 9638858,   
    // to: 9714899
    //})
    // .includeAllBlocks({
    //     from: 8413669,
    //     to: 9715223
    // from: 9638858,
    // to: 9714899
    //})
    .addTransaction({
        to: ['0xD53902aDB00ae787fD7d63c97F6213327c0fC38A'],
        range: { from: 8413669, to: 8769875 }
    })
    .addTransaction({
        to: ['0xD53902aDB00ae787fD7d63c97F6213327c0fC38A'],
        range: { from: 8769877, to: 8859133 }
    })
    .addTransaction({
        to: ['0xD53902aDB00ae787fD7d63c97F6213327c0fC38A'],
        range: { from: 8862000, to: 9327079 }
    })
    .addTransaction({
        to: ['0xD53902aDB00ae787fD7d63c97F6213327c0fC38A'],
        range: { from: 9328500, to: 9343088 }
    })
    .addTransaction({
        to: ['0xD53902aDB00ae787fD7d63c97F6213327c0fC38A'],
        range: { from: 9343090, to: 9515838 }
    })
    .addTransaction({
        to: ['0xD53902aDB00ae787fD7d63c97F6213327c0fC38A'],
        range: { from: 9516850, to: 10264382 }
    })


export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
