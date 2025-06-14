import { ethers } from 'ethers';
import { getImage, getMetaData } from '../../services/pinataService.js';
import { getMarketplaceContract, getNFTContract } from '../../utils/getContract.js';
import pako from 'pako';
import { arrayBufferToBase64 } from '../../utils/toBase64.js';

export const nftResolvers = {
  Query: {
    /**
     * Resolver for fetching NFT metadata and images from the marketplace
     * @returns {Array} - List of NFTs with metadata and image data
     */
    getNFTs: async () => {
      try {
        // Get the marketplace contract
        const marketplaceContract = getMarketplaceContract();

        // Fetch all market items
        const items = await marketplaceContract.fetchMarketItems();

        // Process each item to fetch its metadata and image
        const itemsWithMetadata = await Promise.all(
          items.map(async (item) => {
            try {
              const nftContract = getNFTContract();
              const tokenURI = await nftContract.tokenURI(item.tokenId);

              // Fetch metadata and image from IPFS
              const metadata = await getMetaData(tokenURI.toString());
              const imageData = await getImage(metadata.image.toString());

              // Convert Blob to ArrayBuffer
              const arrayBuffer = await imageData.image.arrayBuffer();

              // Compress the ArrayBuffer using pako
              const compressed = pako.deflate(arrayBuffer);

              // Convert the compressed data to Base64
              const base64Data = arrayBufferToBase64(compressed);

              // Return the complete item data
              return {
                ...item,
                metadata,
                img: { data: base64Data, contentType: imageData.contentType },
              };
            } catch (error) {
              console.error(`Error processing item ${item.tokenId}:`, error);
              return { ...item, metadata: null, img: null };
            }
          })
        );

        // Format the items with metadata and images for the response
        return itemsWithMetadata.map((item) => ({
          itemId: item[0].toString(),
          nftContract: item[1],
          tokenId: item[2].toString(),
          seller: item[3],
          owner: item[4],
          price: ethers.formatEther(item[5]),
          sold: item[6],
          metadata: item.metadata,
          image: item.img,
        }));
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        throw new Error('Failed to fetch NFTs');
      }
    },
  },
};
