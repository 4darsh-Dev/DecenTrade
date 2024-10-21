import { ethers, JsonRpcProvider } from 'ethers'
import DecentradeNFTAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeNFT.json'
import DecentradeMarketplaceAbi from '../../../smart-contracts/artifacts/contracts/Marketplace.sol/DecentradeMarketplace.json'
// import {
//     testIpfs,
//     uploadMetadataToIPFS,
//     uploadToIPFS,
// } from '../services/pinataService'

const nftAddress = import.meta.env.VITE_NFT_ADDRESS
const marketplaceAddress = import.meta.env.VITE_MARKET_ADDRESS
const infuraApiUrl = import.meta.env.VITE_INFURE_API

// For local testing ONLY
// const API_URL = "http://localhost:3000"

const API_URL = import.meta.env.VITE_API_URL
const VITE_PINATA_GATEWAY = import.meta.env.VITE_PINATA_GATEWAY

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
    const provider = new JsonRpcProvider(infuraApiUrl)

    console.log('provider:', provider)
    return new ethers.Contract(
        marketplaceAddress,
        DecentradeMarketplaceAbi.abi,
        provider
    )
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

const fetchMetadata = async (tokenURI) => {
    try {
        //dbg
        // console.log('Fetching metadata from:', tokenURI)
        let tokenLink = 'https://' + VITE_PINATA_GATEWAY + '/ipfs/' + tokenURI
        const response = await fetch(tokenLink)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const metadata = await response.json()
        //dbg
        // console.log('Fetched metadata:', metadata)
        return metadata
    } catch (error) {
        console.error('Error fetching metadata:', error)
        return null
    }
}

export const fetchMarketItems = async (signer) => {
    const marketplaceContract = getMarketplaceContract(signer)
    const items = await marketplaceContract.fetchMarketItems()

    // Fetch token URIs for each item
    const itemsWithMetadata = await Promise.all(
        items.map(async (item) => {
            const nftContract = getNFTContract(signer)
            try {
                const tokenURI = await nftContract.tokenURI(item.tokenId)
                //dbg
                console.log(`Token URI for item ${item.tokenId}:`, tokenURI)
                const metadata = await fetchMetadata(tokenURI)
                return { ...item, metadata }
            } catch (error) {
                console.error(
                    `Error fetching tokenURI for item ${item.tokenId}:`,
                    error
                )
                return { ...item, metadata: null }
            }
        })
    )

    return itemsWithMetadata
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
