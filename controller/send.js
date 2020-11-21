
// 1. Import ContractKit
const ContractKit = require('@celo/contractkit')
// 2. Init a new kit

const kit = ContractKit.newKit('https://alfajores-forno.celo-testnet.org')
//
// Read Accounts
//


//
// Send Gold
//

exports.makeSell = async function (req, res) {
    try {
        // 10.  Get your account
        let account = await getAccount()
        // 11. Add your account to ContractKit to sign transactions
        kit.addAccount(account.privateKey)
        // 12. Specify recipient Address
        let anAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'
        // 13. Specify an amount to send
        let amount = 100000
        // 14. Get the Gold Token contract wrapper
        let goldtoken = await kit.contracts.getGoldToken()
        // 15. Transfer gold from your account to anAddress
        let tx = await goldtoken.transfer(anAddress, amount).send({ from: account.address })
        // 16. Wait for the transaction to be processed
        let receipt = await tx.waitReceipt()
        // 17. Print receipt
        console.log('Transaction receipt: %o', receipt)
        // 18. Get your new balance
        let balance = await goldtoken.balanceOf(account.address)
        // 19. Print new balance
        console.log(`Your new account balance: ${balance.toString()}`)

        res.json({
            success: true,
            message: 'transaction successfully sent'
        });
    } catch (e) {
        res.json({
            success: false,
            message: 'An error has occurred',
            error: e
        });
    }
}

