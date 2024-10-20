// src/pages/CreateNFT.jsx
import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { connectWallet, createNFT } from '../utils/ethereum'
import { ethers } from 'ethers'
import Footer from '../components/Footer'
import image from '../assets/decen-bg.jpg'

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Create NFT</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="file"
                        className="block text-sm font-medium text-gray-700"
                    >
                        File
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create NFT
                </button>
            </form>
        </div>
    )
}
CreateNFT.propTypes = {
    wallet: PropTypes.object.isRequired,
    // wallet: PropTypes.object,
}

export default CreateNFT;
