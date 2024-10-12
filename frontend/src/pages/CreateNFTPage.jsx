// src/pages/CreateNFT.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import { createNFT } from '../utils/ethereum'

const CreateNFT = ({ wallet }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        file: null,
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!wallet) {
            alert('Please connect your wallet')
            return
        }

        try {
            const { name, description, price, file } = formData
            await createNFT(wallet, name, description, price, file)
            alert('NFT created successfully!')
            setFormData({ name: '', description: '', price: '', file: null })
        } catch (error) {
            console.error('Error creating NFT:', error)
            alert('Error creating NFT. Please try again.')
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
    wallet: PropTypes.object,
}

export default CreateNFT
