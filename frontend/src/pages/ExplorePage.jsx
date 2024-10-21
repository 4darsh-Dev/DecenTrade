import React, { useState, useEffect } from 'react'
import { fetchMarketItems, buyNFT } from '../utils/ethereum'
import NFTCard from '../components/NFTCard'
import { connectWallet } from '../utils/ethereum'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'

const ExplorePage = () => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [wallet, setWallet] = useState(null)
    const [counter, setCounter] = useState(10) // Counter for redirect
    const navigate = useNavigate()

    useEffect(() => {
        const initializeWallet = async () => {
            console.log("Connecting to wallet...")
            try {
                const wallet = await connectWallet()
                setWallet(wallet)
            } catch {
                console.log("No wallet detected")
                setError('No wallet found. Please connect your wallet to use the application.')
            }
        }
        initializeWallet()
    }, [])

    useEffect(() => {
        if (wallet) {
            console.log("Loading NFTs...")
            loadNFTs()
        }
    }, [wallet])

    // Countdown and auto-redirect logic when error occurs
    useEffect(() => {
        if (error) {
            const timer = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1)
            }, 1000)

            if (counter === 0) {
                clearInterval(timer)
                navigate('/')
            }

            return () => clearInterval(timer)
        }
    }, [error, counter, navigate])

    const loadNFTs = async () => {
        if (wallet) {
            try {
                console.log('Starting to fetch market items...')
                setLoading(true)
                setError(null)
                const items = await fetchMarketItems(wallet)
                console.log('Fetched items:', items)

                if (!Array.isArray(items)) {
                    throw new Error('Fetched items are not in the expected format')
                }

                const formattedItems = items.map((item) => ({
                    itemId: item[0].toString(),
                    nftContract: item[1],
                    tokenId: item[2].toString(),
                    seller: item[3],
                    owner: item[4],
                    price: ethers.formatEther(item[5]),
                    sold: item[6],
                }))

                console.log('Formatted items:', formattedItems)
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

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center mt-20">
                <div className="bg-gradient-to-r from-red-600 to-red-400 border border-blue-700 text-white px-10 py-8 rounded-xl shadow-2xl max-w-2xl text-lg" role="alert">
                    <div className="mb-4">
                        <strong className="font-bold text-2xl block text-center text-white">Error!</strong>
                    </div>
                    <div>
                        <span className="block sm:inline text-white">{error}</span>
                    </div>
                <div className="mt-6 flex flex-col items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                    >
                        Go to Homepage
                    </button>
                    <p className="mt-2 text-white">Redirecting in {counter} seconds...</p>
                </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="text-center py-10">
                Loading NFTs... Please wait.
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Explore NFTs</h1>
            {nfts.length === 0 ? (
                <p className="text-center">
                    No NFTs available in the marketplace.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nfts.map((nft) => (
                        <NFTCard key={nft.itemId} nft={nft} onBuy={handleBuy} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExplorePage
