// src/components/NFTCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'

const NFTCard = ({ nft, onBuy }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
            <p className="text-gray-600 mb-2">{nft.description}</p>
            <p className="font-bold mb-2">
                {ethers.utils.formatEther(nft.price)} ETH
            </p>
            <div className="flex justify-between">
                <Link
                    to={`/nft/${nft.tokenId}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    View Details
                </Link>
                {onBuy && (
                    <button
                        onClick={() => onBuy(nft)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Buy
                    </button>
                )}
            </div>
        </div>
    )
}

export default NFTCard
