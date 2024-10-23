import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connectWallet, createNFT } from '../utils/ethereum'
import { ethers } from 'ethers'

const nftAddress = import.meta.env.VITE_NFT_ADDRESS
const marketplaceAddress = import.meta.env.VITE_MARKET_ADDRESS

const CreateNFT = ({ wallet }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        file: null,
    })
    const [dragging, setDragging] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!dragging) setDragging(true); // Prevent unnecessary reassignments
    }

    const handleDragLeave = () => {
        if (dragging) setDragging(false); // Prevent unnecessary reassignments
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFiles = e.dataTransfer.files;

        if (droppedFiles && droppedFiles[0]) {
            setFormData((prevState) => ({
                ...prevState,
                file: droppedFiles[0],
            }));
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            file: file,
        }));
    }

    const handleCancelFile = () => {
        setFormData((prevState) => ({
            ...prevState,
            file: null,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { name, description, price, file } = formData

            if (!name || !description || !price || !file) {
                throw new Error('All fields are required')
            }

            const signer = await connectWallet()

            try {
                const tokenId = await createNFT(
                    signer,
                    name,
                    description,
                    price,
                    file,
                    nftAddress,
                    marketplaceAddress
                )
                console.log('NFT created and listed with token ID:', tokenId)
            } catch (error) {
                console.error('Failed to create and list NFT:', error)
            }
        } catch (error) {
            console.error('Error creating NFT:', error)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black overflow-hidden">
            <div
                className="text-white shadow-2xl rounded-lg p-10 mt-10 mb-10 max-w-2xl w-full mx-4 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                style={{
                    background: 'linear-gradient(to bottom right, #252550 20%, #ff00ff 100%)',
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button" 
            >
                <h1 className="text-4xl font-bold text-center text-white mb-6">
                    CREATE NFT
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-1"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter NFT name"
                            required
                            className="w-full p-3 border-none rounded-lg shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter NFT description"
                            required
                            className="w-full p-3 border-none rounded-lg shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium mb-1"
                        >
                            Price (ETH)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Set a price in ETH"
                            required
                            step="0.01"
                            className="w-full p-3 border-none rounded-lg shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="file"
                            className="block text-sm font-medium mb-1"
                        >
                            File
                        </label>
                        <div
                            className={`p-3 border-none rounded-lg shadow-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer ${
                                dragging ? 'border-dashed border-purple-500' : ''
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            role="button" 
                        >
                            {formData.file ? (
                                <div className="flex justify-between items-center">
                                    <span>{formData.file.name}</span>
                                    <button
                                        type="button"
                                        onClick={handleCancelFile}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center"> 
                                    <p className="text-gray-500">Drag And Drop File Or</p>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        onChange={handleFileChange}
                                        required
                                        className="cursor-pointer ml-1" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 rounded-lg transition"
                    >
                        Create NFT
                    </button>
                </form>
            </div>
        </div>
    )
}

CreateNFT.propTypes = {
    wallet: PropTypes.object.isRequired,
}

export default CreateNFT
