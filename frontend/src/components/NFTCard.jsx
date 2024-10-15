// src/components/NFTCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'

const NFTCard = ({ nft, onBuy }) => (
    <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-bold">
            {nft.name || `NFT #${nft.tokenId}`}
        </h2>
        <p>Price: {nft.price} ETH</p>
        <button
            onClick={() => onBuy(nft)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
            Buy
        </button>
    </div>
)

export default NFTCard
