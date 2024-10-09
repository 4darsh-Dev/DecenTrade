require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
// ERRoR
// const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
// const PRIVATE_KEY = process.env.PRIVATE_KEY

const { API_URL, PRIVATE_KEY } = process.env

console.log(process.env.PRIVATE_KEY)
console.log(typeof process.env.PRIVATE_KEY)

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.2",
      },
      {
        version: "0.8.24",
      },
      {
        version: "0.7.6",
      },
      {
        version: "0.6.12",
      },
    ],
  },
}
