require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

const { SEPOLIA_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.0",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_URL, // This reads from .env
      accounts: [PRIVATE_KEY], // This reads from .env
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
