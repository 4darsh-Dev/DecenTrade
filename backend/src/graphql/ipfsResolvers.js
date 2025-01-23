import { testIpfs, uploadToIPFS, uploadMetadataToIPFS } from '../../services/pinataService.js';

export const ipfsResolvers = {
  Mutation: {
    /**
     * Resolver for uploading an image to IPFS
     * @param {Object} _ - Parent object (unused here)
     * @param {Object} file - File input from the mutation
     * @returns {Object} - IPFS response with the uploaded file hash
     */
    uploadImage: async (_, { file }) => {
      try {
        // Destructure file properties from the upload
        const { createReadStream, filename } = await file;
        const fileStream = createReadStream();

        // Read the file stream into a buffer
        const chunks = [];
        for await (let chunk of fileStream) {
          chunks.push(chunk);
        }
        const fileBuffer = Buffer.concat(chunks);

        // Test IPFS connection and upload the file
        await testIpfs();
        const ipfsHash = await uploadToIPFS(filename, fileBuffer);

        // Return the IPFS hash as the response
        return { ipfsHash };
      } catch (err) {
        console.error('Error uploading image to IPFS:', err);
        throw new Error('Failed to upload image to IPFS');
      }
    },

    /**
     * Resolver for uploading metadata to IPFS
     * @param {Object} _ - Parent object (unused here)
     * @param {Object} metadata - Metadata input from the mutation
     * @returns {Object} - IPFS response with the uploaded metadata hash
     */
    uploadMetadata: async (_, { metadata }) => {
      try {
        // Destructure metadata fields
        const { name, description, image } = metadata;

        // Validate required metadata fields
        if (!name || !description || !image) {
          throw new Error('Missing metadata fields: name, description, or image');
        }

        const data = { name, description, image };

        // Test IPFS connection and upload metadata
        await testIpfs();
        const ipfsHash = await uploadMetadataToIPFS(data);

        // Return the IPFS hash as the response
        return { ipfsHash };
      } catch (err) {
        console.error('Error uploading metadata to IPFS:', err);
        throw new Error('Failed to upload metadata to IPFS');
      }
    },
  },
};
