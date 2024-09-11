import { ethers } from 'ethers'
import DecentradeNFTAbi from '../contracts/DecentradeNFT.json'
import DecentradeMarketplaceAbi from '../contracts/DecentradeMarketplace.json'

const nftAddress = 'YOUR_DEPLOYED_NFT_CONTRACT_ADDRESS'
const marketplaceAddress = 'YOUR_DEPLOYED_MARKETPLACE_CONTRACT_ADDRESS'

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            return signer
        } catch (error) {
            console.error('User denied account access')
        }
    } else {
        console.log('Ethereum object not found, install MetaMask.')
    }
}

export const getNFTContract = (signer) => {
    return new ethers.Contract(nftAddress, DecentradeNFTAbi.abi, signer)
}

export const getMarketplaceContract = (signer) => {
    return new ethers.Contract(
        marketplaceAddress,
        DecentradeMarketplaceAbi.abi,
        signer
    )
}

export const mintNFT = async (signer, tokenURI) => {
    const nftContract = getNFTContract(signer)
    const transaction = await nftContract.mintNFT(
        await signer.getAddress(),
        tokenURI
    )
    await transaction.wait()
    return transaction
}

export const listNFT = async (signer, nftContract, tokenId, price) => {
    const marketplaceContract = getMarketplaceContract(signer)
    const listingFee = await marketplaceContract.getListingFee()
    const transaction = await marketplaceContract.createMarketItem(
        nftContract,
        tokenId,
        price,
        { value: listingFee }
    )
    await transaction.wait()
    return transaction
}

export const buyNFT = async (signer, nftContract, itemId, price) => {
    const marketplaceContract = getMarketplaceContract(signer)
    const transaction = await marketplaceContract.createMarketSale(
        nftContract,
        itemId,
        { value: price }
    )
    await transaction.wait()
    return transaction
}

export const fetchMarketItems = async (signer) => {
    const marketplaceContract = getMarketplaceContract(signer)
    const data = await marketplaceContract.fetchMarketItems()
    return data
}
