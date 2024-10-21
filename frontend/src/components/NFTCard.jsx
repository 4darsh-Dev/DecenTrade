import React from 'react'
import { ethers } from 'ethers'

const NFTCard = ({ nft, onBuy, imageUrl, name, description }) => {
    const truncateAddress = (address) =>
        `${address.slice(0, 6)}...${address.slice(-4)}`

    const handleAddressClick = (address) => {
        window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{`NFT #${nft.tokenId}`}</h2>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-64 object-cover mb-4"
                    />
                )}
                {/* <h2 className="text-xl font-bold mb-2">
                    {name || `NFT #${nft.tokenId}`}
                </h2> */}
                <p className="mb-2">
                    {description || 'No description available'}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Contract:</span>{' '}
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => handleAddressClick(nft.nftContract)}
                    >
                        {truncateAddress(nft.nftContract)}
                    </span>
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Owner:</span>{' '}
                    {truncateAddress(nft.owner)}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Seller:</span>{' '}
                    {truncateAddress(nft.seller)}
                </p>
                <p className="text-2xl font-bold text-indigo-600 mb-4">
                    {nft.price} ETH
                </p>
                <button
                    onClick={() => onBuy(nft)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Buy Now
                </button>
            </div>
        </div>
    )
}

export default NFTCard
