import { ethers } from 'ethers';
import { getImage, getMetaData } from '../services/pinataService.js';
import { getMarketplaceContract, getNFTContract } from '../utils/getContract.js';
import pako from 'pako';
import { arrayBufferToBase64 } from '../utils/toBase64.js';

export const getNfts = async () => {
  try {
    const marketplaceContract = getMarketplaceContract();
    const items = await marketplaceContract.fetchMarketItems();

    // Fetch token URIs and metadata for each item
    const itemsWithMetadata = await Promise.all(
      items.map(async (item) => {
        const nftContract = getNFTContract();
        try {
          const tokenURI = await nftContract.tokenURI(item.tokenId);

          // Fetch metadata from IPFS
          const metadata = await getMetaData(tokenURI.toString());

          // Fetch and process image data
          const imageData = await getImage(metadata.image.toString());
          const arrayBuffer = await imageData.image.arrayBuffer();
          const compressed = pako.deflate(arrayBuffer);
          const base64Data = arrayBufferToBase64(compressed);

          return {
            ...item,
            metadata,
            img: { data: base64Data, contentType: imageData.contentType },
          };
        } catch (error) {
          console.error(
            `Error fetching tokenURI or metadata for item ${item.tokenId}:`,
            error
          );
          return { ...item, metadata: null };
        }
      })
    );

    // Format the items with metadata for the GraphQL response
    const formattedItems = itemsWithMetadata.map((item) => ({
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

    return {
      success: true,
      data: formattedItems,
    };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return {
      success: false,
      message: `Error fetching NFTs: ${error.message}`,
      data: [],
    };
  }
};
