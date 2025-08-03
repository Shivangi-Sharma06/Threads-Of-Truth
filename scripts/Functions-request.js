const { buildRequestCBOR, Location, CodeLanguage } = require("@chainlink/functions-toolkit");
const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL;
  const contractAddress = "YOUR_DEPLOYED_VERIFIER_CONTRACT_ADDRESS"; // 🔁 replace this

  const abi = [
    "function executeRequest(bytes source, bytes secrets, bytesArgs, uint64 subscriptionId, uint32 gasLimit) external returns (bytes32)"
  ];

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  const sourceCode = `
    return Functions.makeHttpRequest({
      url: "https://api.coindesk.com/v1/bpi/currentprice.json"
    }).then((res) => {
      return Functions.encodeString(res.data.bpi.USD.rate_float.toString());
    });
  `;

  const request = await buildRequestCBOR({
    codeLocation: Location.Inline,
    codeLanguage: CodeLanguage.JavaScript,
    source: sourceCode,
    args: [],
    secrets: undefined
  });

  const tx = await contract.executeRequest(
    request.code,
    request.secrets || "0x",
    request.args || "0x",
    0, // Update to actual subscription ID if needed
    100000
  );

  console.log("Request sent! Tx hash:", tx.hash);
}

main().catch(console.error);
