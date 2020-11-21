import { newKit } from '@celo/contractkit'
import { CeloContract } from '@celo/contractkit'

const kit = newKit('https://alfajores-forno.celo-testnet.org')

let accounts = await kit.web3.eth.getAccounts()
kit.defaultAccount = accounts[0]
// paid gas in cUSD
await kit.setFeeCurrency(CeloContract.StableToken)

let totalBalance = await kit.getTotalBalance(' 0x5409ED021D9299bf6814279A6A1411A7e866A631 ')

let bytecode = '0x608060405234...' // compiled Solidity deployment bytecode

let tx = await kit.sendTransaction({
    data: bytecode
})

let receipt = tx.waitReceipt()
console.log(receipt)


// This is at lower price I will accept in cUSD for every CELO
const favorableAmount = 100
const amountToExchange = kit.web3.utils.toWei('10', 'ether')
const oneGold = kit.web3.utils.toWei('1', 'ether')
const exchange = await kit.contracts.getExchange()

const amountOfcUsd = await exchange.quoteGoldSell(oneGold)

if (amountOfcUsd > favorableAmount) {
    const goldToken = await kit.contracts.getGoldToken()
    const approveTx = await goldToken.approve(exchange.address, amountToExchange).send()
    const approveReceipt = await approveTx.waitReceipt()

    const usdAmount = await exchange.quoteGoldSell(amountToExchange)
    const sellTx = await exchange.sellGold(amountToExchange, usdAmount).send()
    const sellReceipt = await sellTx.waitReceipt()
}
