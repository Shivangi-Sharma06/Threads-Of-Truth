const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = "0x2b57ef0df7AAA0DDC8996Bbeef5468428C79A069";
  const subscriptionId = 5389; // just the number, not in quotes if it’s a number
  const gasLimit = 100000;

  // Chainlink Function source code (very simple logic for demo)
  const source = `
    if (args[0] === "verified") {
      return Functions.encodeString("VALID");
    } else {
      return Functions.encodeString("INVALID");
    }
  `;

  const args = ["verified"]; // change to ["fake"] to simulate invalid

  const ThreadsOfTruth = await ethers.getContractFactory("ThreadsOfTruth");
  const contract = ThreadsOfTruth.attach(contractAddress);

  const tx = await contract.sendRequest(
    source,
    "0x", // empty secrets
    args.map((arg) => ethers.utils.toUtf8Bytes(arg)),
    subscriptionId,
    gasLimit
  );

  console.log("Request sent. Tx hash:", tx.hash);
  await tx.wait();
  console.log("Transaction confirmed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

