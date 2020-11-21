
// 1. Import ContractKit
const ContractKit = require('@celo/contractkit')
// 2. Init a new kit

const kit = ContractKit.newKit('https://alfajores-forno.celo-testnet.org')
//
// Read Accounts
//

async function readAccount() {
    // 3. Get the Gold Token contract
    let goldtoken = await kit.contracts.getGoldToken()
    // 4. Address to look up
    let anAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'
    // 5. Get Gold Token Balance
    let balance = await goldtoken.balanceOf(anAddress)
    // Print balance
    console.log(`${anAddress} balance: ${balance.toString()}`)
}


readAccount()