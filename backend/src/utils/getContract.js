import { ethers, JsonRpcProvider } from 'ethers'
// import { InfuraProvider } from '@ethersproject/providers';
import DecentradeNFTAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeNFT.json' assert { type: 'json' }
import DecentradeMarketplaceAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeMarketplace.json' assert { type: 'json' }

const nftAddress = process.env.NFT_ADDRESS
const marketplaceAddress = process.env.MARKET_ADDRESS
const infuraUrl = process.env.INFURA_URL
const infuraKey = process.env.INFURA_KEY
export const getNFTContract = () => {
  try {
    const network = 'sepolia'
    const provider = new ethers.InfuraProvider(network, infuraKey)
    // const provider = new JsonRpcProvider(infuraUrl)
    return new ethers.Contract(nftAddress, DecentradeNFTAbi.abi, provider)
  } catch (e) {
    console.error(e)
  }
}

export const getMarketplaceContract = () => {
  try {
    const network = 'sepolia'

    const provider = new ethers.InfuraProvider(network, infuraKey)
    // const provider = new JsonRpcProvider(infuraUrl)
    return new ethers.Contract(
      marketplaceAddress,
      DecentradeMarketplaceAbi.abi,
      provider
    )
  } catch (e) {
    console.error(e)
  }
}
