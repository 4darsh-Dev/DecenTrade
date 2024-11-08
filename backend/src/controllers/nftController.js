import { ethers } from 'ethers'
import { getImage, getMetaData } from '../services/pinataService.js'
import { getMarketplaceContract, getNFTContract } from '../utils/getContract.js'
import pako from 'pako'
import { arrayBufferToBase64 } from '../utils/toBase64.js'

export const getNfts = async (req, res) => {
  const marketplaceContract = getMarketplaceContract()
  const items = await marketplaceContract.fetchMarketItems()
  // Fetch token URIs for each item
  const itemsWithMetadata = await Promise.all(
    items.map(async (item) => {
      const nftContract = getNFTContract()
      try {
        const tokenURI = await nftContract.tokenURI(item.tokenId)
        //dbg
        // console.log(`Token URI for item ${item.tokenId}:`, tokenURI)
        const metadata = await getMetaData(tokenURI.toString())
        // const metadata = await getMetaData(tokenURI)
        // console.log(metadata, 'metadata')
        const imageData = await getImage((metadata.image).toString())
        // Convert Blob to ArrayBuffer
        const arrayBuffer = await imageData.image.arrayBuffer()

        // Compress the ArrayBuffer using pako
        const compressed = pako.deflate(arrayBuffer)

        // Convert the compressed data to Base64
        const base64Data = arrayBufferToBase64(compressed)
        // console.log(image, 'image')
        const data = {
          ...item,
          metadata,
          img: { data: base64Data, contentType: imageData.contentType }
        }
        // console.log(data)
        return data
      } catch (error) {
        console.error(
          `Error fetching tokenURI for item ${item.tokenId}:`,
          error
        )
        return { ...item, metadata: null }
      }
    })
  )
  const formattedItems = itemsWithMetadata.map((item) => ({
    itemId: item[0].toString(),
    nftContract: item[1],
    tokenId: item[2].toString(),
    seller: item[3],
    owner: item[4],
    price: ethers.formatEther(item[5]),
    sold: item[6],
    metadata: item.metadata,
    image: item.img
  }))
  res.status(200).json({ data: formattedItems })
}
