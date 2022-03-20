require('dotenv').config()
var Web3 = require('web3')
var url = process.env.ETHEREUM_RPC_WSS_URL

var options = {
  timeout: 30000,
  clientConfig: {
    maxReceivedFrameSize: 100000000,
    maxReceivedMessageSize: 100000000,
  },
  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 15,
    onTimeout: false,
  },
}

var web3 = new Web3(new Web3.providers.WebsocketProvider(url, options))
const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
  if (err) console.error(err)
})

var init = function () {
  subscription.on('data', txHash => {
    setTimeout(async () => {
      try {
        let tx = await web3.eth.getTransaction(txHash)
        console.log(tx)
      } catch (err) {
        console.error(err)
      }
    })
  })
}

init()
