// src/pages/Explore.jsx
import { useState, useEffect } from 'react'
import { fetchMarketItems, buyNFT } from '../utils/ethereum'
import NFTCard from '../components/NFTCard'

const Explore = ({ wallet }) => {
    const [nfts, setNfts] = useState([])

    useEffect(() => {
        const loadNFTs = async () => {
            if (wallet) {
                const items = await fetchMarketItems(wallet)
                setNfts(items)
            }
        }
        loadNFTs()
    }, [wallet])

    const handleBuy = async (nft) => {
        if (wallet) {
            try {
                await buyNFT(wallet, nft.nftContract, nft.itemId, nft.price)
                alert('NFT purchased successfully!')
                // Refresh NFTs
                const items = await fetchMarketItems(wallet)
                setNfts(items)
            } catch (error) {
                console.error('Error buying NFT:', error)
                alert('Error buying NFT. Please try again.')
            }
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Explore NFTs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft) => (
                    <NFTCard key={nft.itemId} nft={nft} onBuy={handleBuy} />
                ))}
            </div>
        </div>
    )
}

export default Explore
