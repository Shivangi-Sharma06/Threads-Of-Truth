require("@nomiclabs/hardhat-ethers");
// require("@chainlink/functions-toolkit/hardhat-plugin"); // ✅ Required for Functions
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: "0.8.19",
};
