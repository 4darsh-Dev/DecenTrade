import React, { useState, useEffect } from 'react'
import {
    connectWallet,
    mintNFT,
    listNFT,
    buyNFT,
    fetchMarketItems,
} from '../utils/ethereum'

const WalletConnect = ({wallet,setWallet}) => {
    

    const connect = async () => {
        const signer = await connectWallet()
        setWallet(signer)
    }

    return (
        <div className="p-4">
            {wallet ? (
                <p className="text-green-500">Wallet connected</p>
            ) : (
                <button
                    onClick={connect}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    )
}

const MintNFT = ({ wallet }) => {
    const [tokenURI, setTokenURI] = useState('')

    const handleMint = async () => {
        if (wallet && tokenURI) {
            try {
                await mintNFT(wallet, tokenURI)
                alert('NFT minted successfully!')
            } catch (error) {
                console.error('Error minting NFT:', error)
            }
        }
    }

    return (
        <div className="p-4">
            <input
                type="text"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
                placeholder="Enter token URI"
                className="border p-2 mr-2"
            />
            <button
                onClick={handleMint}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Mint NFT
            </button>
        </div>
    )
}

const MarketplaceItems = ({ wallet }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const getMarketItems = async () => {
            if (wallet) {
                const marketItems = await fetchMarketItems(wallet)
                setItems(marketItems)
            }
        }
        getMarketItems()
    }, [wallet])

    const handleBuy = async (item) => {
        if (wallet) {
            try {
                await buyNFT(wallet, item.nftContract, item.itemId, item.price)
                alert('NFT purchased successfully!')
            } catch (error) {
                console.error('Error buying NFT:', error)
            }
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Marketplace Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="border p-4 rounded">
                        <p>Token ID: {item.tokenId.toString()}</p>
                        <p>Price: {ethers.utils.formatEther(item.price)} ETH</p>
                        <button
                            onClick={() => handleBuy(item)}
                            className="mt-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function NFTMarketplace() {
    const [wallet, setWallet] = useState(null)

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">
                Decentrade NFT Marketplace
            </h1>
            <WalletConnect setWallet={setWallet} />
            {wallet && (
                <>
                    <MintNFT wallet={wallet} />
                    <MarketplaceItems wallet={wallet} />
                </>
            )}
        </div>
    )
}
