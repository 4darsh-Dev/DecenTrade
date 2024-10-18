import { useState } from 'react'
import { connectWallet, createNFT, getNFTContract } from '../utils/ethereum'
import { ethers } from 'ethers'

const nftAddress = import.meta.env.VITE_NFT_ADDRESS
const marketplaceAddress = import.meta.env.VITE_MARKET_ADDRESS

export default function CreateNFT({ wallet }) {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    file: null ,
  })

  const handleChange = () => {
    const { name, value, files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }))
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
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6" >Create your NFT</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="connect-wallet-button w-full"
                >
                  Create NFT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
