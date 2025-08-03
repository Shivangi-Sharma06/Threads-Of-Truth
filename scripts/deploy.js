const hre = require("hardhat");

async function main() {
  const routerAddress = "0xcc79157eb46f5624204f47ab42b3906caa40ea7b"; // Fixed
  const donId = "0x7b82c164f822bcd38cb438e6e6e51648b9a3f133b3c1773a75fcb23c3c76ca98"; // already in bytes32 format
  const linkToken = "0x779877A7B0D9E8603169DdbD7836e478b4624789"; // Correct

  const ContractFactory = await hre.ethers.getContractFactory("ThreadsOfTruth");
  const contract = await ContractFactory.deploy(routerAddress, donId);

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
