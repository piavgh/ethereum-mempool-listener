const ethers = require("ethers");
const ABI = require("./abis/usdc.json");
require("dotenv").config();

async function getTransfer() {
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; ///USDC Contract
  const provider = new ethers.providers.WebSocketProvider(
    `${process.env.WSS_RPC_URL}`
  );
  const contract = new ethers.Contract(usdcAddress, ABI, provider);
  contract.on("Transfer", (from, to, value, event) => {
    let transferEvent = {
      from: from,
      to: to,
      value: value,
      eventData: event,
    };
    console.log(JSON.stringify(transferEvent, null, 4));
  });
}

getTransfer();
