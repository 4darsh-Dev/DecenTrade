import { ethers, JsonRpcProvider } from 'ethers'
import DecentradeNFTAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeNFT.json' assert { type: 'json' }
import DecentradeMarketplaceAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeMarketplace.json' assert { type: 'json' }

const nftAddress = '0x16d8DfCB8FebDbB60E2ce382C5Bf35174ecb4F97'
const marketplaceAddress = '0x590a018d141Ea9346A501458710D30E80DE3Ef56'
const infuraUrl = process.env.INFURA_URL
export const getNFTContract = () => {
  try {
    const provider = new JsonRpcProvider(infuraUrl)
    return new ethers.Contract(nftAddress, DecentradeNFTAbi.abi, provider)
  } catch (e) {
    console.error(e)
  }
}

export const getMarketplaceContract = () => {
  try {
    const provider = new JsonRpcProvider(infuraUrl)
    return new ethers.Contract(
      marketplaceAddress,
      DecentradeMarketplaceAbi.abi,
      provider
    )
  } catch (e) {
    console.error(e)
  }
}
