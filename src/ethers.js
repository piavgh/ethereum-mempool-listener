require("dotenv").config();
var ethers = require("ethers");
var url = process.env.WSS_RPC_URL;

var init = function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(url);

  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(function (transaction) {
      console.log(transaction);
    });
  });

  customWsProvider._websocket.on("error", async (ep) => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

init();
