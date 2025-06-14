import {
    testIpfs,
    uploadMetadataToIPFS,
    uploadToIPFS
  } from '../services/pinataService.js';
  
  export const uploadNftToIpfs = async ({ createReadStream, filename }) => {
    try {
      // Test IPFS connectivity
      await testIpfs();
  
      // Create a buffer from the uploaded file stream
      const fileBuffer = await streamToBuffer(createReadStream());
  
      // Upload the file to IPFS
      const ipfsHash = await uploadToIPFS(filename, fileBuffer);
  
      return {
        ipfsHash,
        success: true,
        message: 'File successfully uploaded to IPFS',
      };
    } catch (err) {
      console.error(err);
      return {
        ipfsHash: null,
        success: false,
        message: `Error uploading file to IPFS: ${err.message}`,
      };
    }
  };
  
  export const uploadMetadataToIpfs = async ({ metadata }) => {
    try {
      const { name, description, image } = metadata;
  
      // Validate metadata fields
      if (!name || !description || !image) {
        return {
          ipfsHash: null,
          success: false,
          message: 'Missing metadata fields: name, description, or image',
        };
      }
  
      const data = { name, description, image };
  
      // Test IPFS connectivity
      await testIpfs();
  
      // Upload the metadata to IPFS
      const ipfsHash = await uploadMetadataToIPFS(data);
  
      return {
        ipfsHash,
        success: true,
        message: 'Metadata successfully uploaded to IPFS',
      };
    } catch (err) {
      console.error(err);
      return {
        ipfsHash: null,
        success: false,
        message: `Error uploading metadata to IPFS: ${err.message}`,
      };
    }
  };
  
  // Helper function to convert stream to buffer
  const streamToBuffer = async (stream) => {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  };
  