require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Ensure that the environment variables are properly loaded
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Add some error checking
if (!API_URL || !PRIVATE_KEY) {
  console.error("Please set API_URL and PRIVATE_KEY in your .env file");
  process.exit(1);
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  solidity: {
    compilers: [
      { version: "0.8.0" },
      { version: "0.8.2" },
      { version: "0.8.24" },
      { version: "0.7.6" },
      { version: "0.6.12" },
    ],
  },
};