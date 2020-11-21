import { newKit } from '@celo/contractkit'
import { CeloContract } from '@celo/contractkit'

const kit = newKit('https://alfajores-forno.celo-testnet.org')

let accounts = await kit.web3.eth.getAccounts()
kit.defaultAccount = accounts[0]
// paid gas in cUSD
await kit.setFeeCurrency(CeloContract.StableToken)

let totalBalance = await kit.getTotalBalance('0x5409ED021D9299bf6814279A6A1411A7e866A631')

let bytecode = '0x608060405234...' // compiled Solidity deployment bytecode

let tx = await kit.sendTransaction({
    data: bytecode
})

let receipt = tx.waitReceipt()
console.log(receipt)

const stableToken = await this.contracts.getStableToken()
const exchange = await this.contracts.getExchange()

const cUsdBalance = await stableToken.balanceOf(accounts.address)

const approveTx = await stableToken.approve(exchange.address, cUsdBalance).send()
const approveReceipt = await approveTx.waitReceipt()

const goldAmount = await exchange.quoteUsdSell(cUsdBalance)
const sellTx = await exchange.sellDollar(cUsdBalance, goldAmount).send()
const sellReceipt = await sellTx.waitReceipt()
