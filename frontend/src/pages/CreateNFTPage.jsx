import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { connectWallet, createNFT } from '../utils/ethereum';

const ThemeToggle = ({ className }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
        document.body.classList.toggle('dark', !darkMode);
    };

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.body.classList.toggle('dark', savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <motion.div
            onClick={toggleDarkMode}
            className={`relative w-24 h-12 rounded-full cursor-pointer flex items-center px-2 ${
                darkMode ? 'bg-[#002855]' : 'bg-[#FFD966]'
            } ${className}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence>
                {darkMode ? (
                    <motion.div
                        key="moon"
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 40, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute left-1 text-blue-400"
                    >
                        <FontAwesomeIcon icon={faMoon} size="lg" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -40, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute right-1 text-yellow-500"
                    >
                        <FontAwesomeIcon icon={faSun} size="lg" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="w-10 h-10 bg-white rounded-full shadow-md"
                layout
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                style={{
                    x: darkMode ? '100%' : '0%',
                }}
            ></motion.div>
        </motion.div>
    );
};

const CreateNFT = ({ wallet }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        file: null,
    });
    const [dragging, setDragging] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!dragging) setDragging(true);
    };

    const handleDragLeave = () => {
        if (dragging) setDragging(false);
    };

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
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            file: file,
        }));
    };

    const handleCancelFile = () => {
        setFormData((prevState) => ({
            ...prevState,
            file: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, description, price, file } = formData;
            if (!name || !description || !price || !file) {
                throw new Error('All fields are required');
            }
            const signer = await connectWallet();
            try {
                const tokenId = await createNFT(
                    signer,
                    name,
                    description,
                    price,
                    file,
                    import.meta.env.VITE_NFT_ADDRESS,
                    import.meta.env.VITE_MARKET_ADDRESS
                );
                console.log('NFT created and listed with token ID:', tokenId);
            } catch (error) {
                console.error('Failed to create and list NFT:', error);
            }
        } catch (error) {
            console.error('Error creating NFT:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-purple-200 to-white dark:from-gray-900 dark:via-purple-900 dark:to-black overflow-hidden transition-colors duration-300">
            <motion.div
                className="text-gray-900 dark:text-white shadow-2xl rounded-lg p-10 mt-10 mb-10 max-w-2xl w-full mx-4 relative transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                style={{
                    background: 'var(--form-bg)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <h1 className="text-4xl font-bold text-center mb-6">
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
                        />
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
                        className="w-full bg-purple-600 dark:bg-purple-800 hover:bg-purple-700 dark:hover:bg-purple-900 text-white font-bold py-3 rounded-lg transition"
                    >
                        Create NFT
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

CreateNFT.propTypes = {
    wallet: PropTypes.object.isRequired,
};

export default CreateNFT;