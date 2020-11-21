const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
var web3 = new Web3()


const filePath = path.join(__dirname, './.secret')

exports.getAccount = async function (req, res) {
    return new Promise(resolve => {
        try {
            if (fs.existsSync(filePath)) {
                fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
                    resolve(web3.eth.accounts.privateKeyToAccount(data))
                })
            } else {
                let randomAccount = web3.eth.accounts.create()

                fs.writeFile(filePath, randomAccount.privateKey, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                })

                resolve(randomAccount)
            }
            res.json({
                success: true,
                message: 'account details fetched'
            })
        } catch {
            res.json({
                success: false,
                message: 'An error has occurred'
            })
        }

    })

}

