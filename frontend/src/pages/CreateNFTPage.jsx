import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connectWallet, createNFT, getNFTContract } from '../utils/ethereum'
import { ethers } from 'ethers'
import Footer from '../components/Footer'
import image from '../assets/decen-bg.jpg'

const nftAddress = import.meta.env.VITE_NFT_ADDRESS
const marketplaceAddress = import.meta.env.VITE_MARKET_ADDRESS

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY

const CreateNFT = ({ wallet }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        file: null,
    })

    const [dragging, setDragging] = useState(false); 
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset the height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to fit content
        }
    };
    
    useEffect(() => {
        adjustTextareaHeight();
    }, [formData.description]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));

        if (name === 'description') {
            adjustTextareaHeight();
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = () => {
        setDragging(false);
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

            // Ensure all required fields are filled
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
        <div
            className="min-h-screen flex flex-col justify-between"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="flex-grow flex justify-center items-center w-full">
                <div className="relative z-10 w-full max-w-xl bg-black bg-opacity-100 shadow-md rounded-3xl px-10 py-10 mt-10 mb-8">
                <h1 className="text-6xl font-extrabold mb-8 text-center text-[#00ffff] shadow-purple-900" 
                    style={{ textShadow: '4px 4px 15px #ff00ff' }}>
                    Create Your NFT
                </h1>
                    <form onSubmit={handleSubmit} className="space-y-8"
                    style={{ backgroundColor: 'black', backgroundOpacity: 0.9}}>
                        <div className="flex flex-col items-center">
                            <label
                                htmlFor="name"
                                className="block text-2xl font-bold mb-2 text-white"
                                style={{ textShadow: '2px 2px 10px #00ffff' }}
                            >
                                NFT Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="block bg-white text-black px-6 py-3 rounded-full w-full max-w-md transition duration-300 box-shadow hover: 0 0 20px #ff00ff shadow-lg mx-auto"
                            />
                        </div>
                        <div className="flex flex-col items-center">
    <label
        htmlFor="description"
        className="block text-2xl font-bold mb-2 text-white"
        style={{ textShadow: '2px 2px 10px #00ffff' }}
    >
        Description
    </label>
    <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        ref={textareaRef}
        rows={1}
        className="block bg-white text-black px-6 py-3 rounded-xl w-full max-w-md transition duration-300 box-shadow hover: 0 0 20px #ff00ff shadow-lg mx-auto"
        style={{
            resize: 'none',
            overflowY: 'hidden',
            height: 'auto',
            borderRadius: '30px', // Control the border-radius to avoid the circle shape
        }}
    />
</div>
                        <div className="flex flex-col items-center">
                            <label
                                htmlFor="price"
                                className="block text-2xl font-bold mb-2 text-white"
                                style={{ textShadow: '2px 2px 10px #00ffff' }}
                            >
                                Price (ETH)
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                step="0.01"
                                className="block bg-white text-black px-6 py-3 rounded-full w-full max-w-md transition duration-300 box-shadow hover: 0 0 20px #ff00ff shadow-lg mx-auto"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <label
                                htmlFor="file"
                                className="block text-2xl font-bold mb-2 text-white"
                                style={{ textShadow: '2px 2px 10px #00ffff' }}
                            >
                                Upload File
                            </label>
                            <div
                                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg ${dragging ? 'border-blue-500' : 'border-gray-500'} bg-black text-white px-6 py-3 w-full max-w-md transition duration-300 box-shadow hover: 0 0 20px #ff00ff shadow-lg mx-auto`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {!formData.file ? (
                                    <>
                                        <p className="text-lg font-semibold text-white">
                                            Drag & drop your file here, or
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="mt-4 inline-block bg-white text-black px-6 py-2 rounded-full transition duration-300 transform hover:scale-110"
                                        >
                                            Browse Files
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-lg font-semibold text-white mb-2">
                                            Uploaded File: {formData.file.name}
                                        </p>
                                        <div className="flex space-x-4">
                                            <button
                                                type="button"
                                                onClick={handleCancelFile}
                                                className="inline-block bg-red-500 text-white px-4 py-2 rounded-full transition duration-300 transform hover:scale-110"
                                            >
                                                Cancel File
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 transform hover:scale-110"
                                            >
                                                Change File
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="inline-block bg-gradient-to-r from-fuchsia-600 to-blue-500 text-white px-8 py-4 rounded-full transition duration-300 transform hover:scale-110"
                                style={{ boxShadow: '0 0 25px #ff00ff', textShadow: '2px 2px 10px #00ffff' }}>
                                Create NFT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

CreateNFT.propTypes = {
    wallet: PropTypes.object.isRequired,
};

export default CreateNFT;
