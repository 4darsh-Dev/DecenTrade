import React, { useState, useEffect } from 'react'
import { fetchMarketItems, buyNFT } from '../utils/ethereum'
import NFTCard from '../components/NFTCard'
import { connectWallet } from '../utils/ethereum'
import { ethers } from 'ethers'

const VITE_PINATA_GATEWAY = import.meta.env.VITE_PINATA_GATEWAY

const ExplorePage = () => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        const initializeWallet = async () => {
            const wallet = await connectWallet()
            setWallet(wallet)
        }
        initializeWallet()
    }, [])

    useEffect(() => {
        if (wallet) {
            loadNFTs()
        }
    }, [wallet])

    const loadNFTs = async () => {
        if (wallet) {
            try {
                console.log('Starting to fetch market items...')
                setLoading(true)
                setError(null)
                const items = await fetchMarketItems(wallet)
                //dbg
                // console.log('Fetched items:', items)
                if (!Array.isArray(items)) {
                    throw new Error(
                        'Fetched items are not in the expected format'
                    )
                }
                const formattedItems = items.map((item) => ({
                    itemId: item[0].toString(),
                    nftContract: item[1],
                    tokenId: item[2].toString(),
                    seller: item[3],
                    owner: item[4],
                    price: ethers.formatEther(item[5]),
                    sold: item[6],
                    metadata: item.metadata,
                }))
                //dbg
                // console.log('Formatted items:', formattedItems)
                setNfts(formattedItems)
            } catch (error) {
                console.error('Error loading NFTs:', error)
                setError(`Failed to load NFTs: ${error.message}`)
            } finally {
                setLoading(false)
            }
        } else {
            console.log('Wallet not connected')
            setLoading(false)
            setError('Please connect your wallet to view NFTs')
        }
    }

    const handleBuy = async (nft) => {
        if (wallet) {
            try {
                setLoading(true)
                await buyNFT(
                    wallet,
                    nft.nftContract,
                    nft.itemId,
                    ethers.parseEther(nft.price)
                )
                alert('NFT purchased successfully!')
                await loadNFTs() // Refresh NFTs after purchase
            } catch (error) {
                console.error('Error buying NFT:', error)
                alert(`Error buying NFT: ${error.message}`)
            } finally {
                setLoading(false)
            }
        } else {
            alert('Please connect your wallet to buy NFTs.')
        }
    }

    if (loading) {
        return (
            <div className="text-center py-10">
                Loading NFTs... Please wait.
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">Error: {error}</div>
        )
    }

    // Debugging: Log the metadata for each NFT
    // console.log('nft value', nfts)
    // for (let i = 0; i < nfts.length; i++) {
    //     console.log('nft value', nfts[i].metadata.name)
    // }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Explore NFTs</h1>
            {nfts.length === 0 ? (
                <p className="text-center">
                    No NFTs available in the marketplace.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nfts.map((nft) => {
                        const metadata = nft.metadata // Parse the metadata string

                        return (
                            <NFTCard
                                key={nft.itemId}
                                nft={nft}
                                onBuy={handleBuy}
                                imageUrl={
                                    'https://' +
                                    VITE_PINATA_GATEWAY +
                                    '/ipfs/' +
                                    metadata.image
                                }
                                name={metadata.name} // Access the parsed name field
                                description={metadata.description} // Access the parsed description field
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ExplorePage
