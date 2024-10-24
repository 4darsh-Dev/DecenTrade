import { ethers } from 'ethers'
import DecentradeNFTAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeNFT.json'
import DecentradeMarketplaceAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeMarketplace.json'
import { handleCompressedBase64Data } from './handleCompressedData'
// import {
//     testIpfs,
//     uploadMetadataToIPFS,
//     uploadToIPFS,
// } from '../services/pinataService'

const nftAddress = import.meta.env.VITE_NFT_ADDRESS
const marketplaceAddress = import.meta.env.VITE_MARKET_ADDRESS
// For local testing ONLY
// const API_URL = "http://localhost:3000"

const API_URL = import.meta.env.VITE_API_URL

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            console.log('Wallet connected:', await signer.getAddress())
            return signer
        } catch (error) {
            console.error('Error connecting wallet:', error)
            throw error
        }
    } else {
        console.error('Ethereum wallet not detected')
        throw new Error('Ethereum wallet not detected')
    }
}

export const getNFTContract = (signer) => {
    try {
        return new ethers.Contract(nftAddress, DecentradeNFTAbi.abi, signer)
    } catch (e) {
        console.error(e)
    }
}

export const getMarketplaceContract = (signer) => {
    try {
        return new ethers.Contract(
            marketplaceAddress,
            DecentradeMarketplaceAbi.abi,
            signer
        )
    } catch (e) {
        console.error(e)
    }
}
const uploadToIPFS = async (file) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await fetch(API_URL + '/ipfs/uploadImage', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        console.log('IPFS Response:', data)
        return data.ipfsHash
    } catch (e) {
        console.error(e)
    }
}
const uploadMetadataToIPFS = async (metadata) => {
    try {
        const formData = new FormData()
        formData.append('metadata', metadata)
        // console.log(formData, 'formData')
        const response = await fetch(API_URL + '/ipfs/uploadMetaData', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        console.log('IPFS Response:', data)
        return data.ipfsHash
    } catch (e) {
        console.error(e)
    }
}
export const createNFT = async (signer, name, description, price, file) => {
    try {
        const fileUrl = await uploadToIPFS(file)
        const nftContract = getNFTContract(signer)
        const marketplaceContract = getMarketplaceContract(signer)
        // console.log(fileUrl, 'fileUrl')
        // Create NFT metadata
        const metadata = JSON.stringify({
            name,
            description,
            image: fileUrl,
        })
        // console.log(metadata, 'metadata')
        const metadataUrl = await uploadMetadataToIPFS(metadata)

        // console.log('Metadata URL:', metadataUrl)

        // Mint NFT
        const mintTx = await nftContract.mintNFT(
            await signer.getAddress(),
            metadataUrl,
            0
        )
        const mintReceipt = await mintTx.wait()

        let tokenId
        if (mintReceipt.events) {
            const transferEvent = mintReceipt.events.find(
                (e) => e.event === 'Transfer'
            )
            if (transferEvent && transferEvent.args) {
                tokenId = transferEvent.args[2]
            }
        }

        if (!tokenId) {
            // If we couldn't extract the tokenId from events, try logs
            const iface = new ethers.Interface(DecentradeNFTAbi.abi)
            for (const log of mintReceipt.logs) {
                try {
                    const parsed = iface.parseLog(log)
                    if (parsed && parsed.name === 'Transfer') {
                        tokenId = parsed.args[2]
                        break
                    }
                } catch (e) {
                    // This log was not for the Transfer event, continue to the next log
                }
            }
        }

        if (!tokenId) {
            throw new Error(
                'Failed to extract tokenId from transaction receipt'
            )
        }

        console.log('Minted NFT with tokenId:', tokenId.toString())

        // Approve marketplace contract to transfer the NFT
        const approveTx = await nftContract.approve(marketplaceAddress, tokenId)
        await approveTx.wait()

        // List NFT
        const listingFee = await marketplaceContract.getListingFee()
        const listingTx = await marketplaceContract.createMarketItem(
            nftAddress,
            tokenId,
            ethers.parseEther(price.toString()),
            { value: listingFee }
        )
        await listingTx.wait()

        return tokenId
    } catch (error) {
        console.error('Error creating NFT:', error)
        throw error
    }
}

export const fetchMarketItems = async () => {
    const response = await fetch(`${API_URL}/nfts/getNfts`)
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''
    let done = false

    while (!done) {
        const { value, done: streamDone } = await reader.read()
        done = streamDone
        if (value) {
            result += decoder.decode(value, { stream: !done })
        }
    }
    const items = JSON.parse(result)
    const data = items.data
    data.forEach(async (item) => {
        const imageData = item.image
        const imgUrl = handleCompressedBase64Data(imageData)
        item.image.data = imgUrl
    })
    return data
}

export const fetchMyNFTs = async (signer) => {
    const marketplaceContract = getMarketplaceContract(signer)
    return await marketplaceContract.fetchMyNFTs()
}

export const buyNFT = async (signer, nftContract, itemId, price) => {
    const marketplaceContract = getMarketplaceContract(signer)
    const transaction = await marketplaceContract.createMarketSale(
        nftContract,
        itemId,
        { value: price }
    )
    return await transaction.wait()
}

export const listNFT = async (signer, tokenId, price) => {
    try {
        const marketplaceContract = getMarketplaceContract(signer)
        const listingFee = await marketplaceContract.getListingFee()
        const transaction = await marketplaceContract.createMarketItem(
            nftAddress,
            tokenId,
            ethers.parseEther(price.toString()),
            { value: listingFee }
        )
        await transaction.wait()
        console.log(`NFT with Token ID ${tokenId} listed successfully.`)
    } catch (error) {
        console.error('Error listing NFT:', error)
        throw error
    }
}

export const mintNFT = async (signer, name, description, file) => {
    try {
        const fileUrl = await uploadToIPFS(file)
        const metadata = JSON.stringify({ name, description, image: fileUrl })
        const metadataUrl = await uploadMetadataToIPFS(metadata)

        const nftContract = getNFTContract(signer)
        const transaction = await nftContract.mintNFT(
            await signer.getAddress(),
            metadataUrl,
            0
        )
        const receipt = await transaction.wait()

        const event = receipt.events.find((event) => event.event === 'Transfer')
        const tokenId = event.args[2]

        console.log(`NFT minted with Token ID: ${tokenId}`)
        return tokenId
    } catch (error) {
        console.error('Error minting NFT:', error)
        throw error
    }
}
