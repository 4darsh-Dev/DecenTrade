import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLUpload } from 'graphql-upload';
import { uploadNftToIpfs, uploadMetadataToIpfs } from '../controllers/ipfsController.js';

// Define the GraphQL schema
const typeDefs = `
  scalar Upload

  type UploadResponse {
    ipfsHash: String
    success: Boolean
    message: String
  }

  type Query {
    # Dummy query to check API status
    _: String
  }

  type Mutation {
    uploadImage(file: Upload!): UploadResponse
    uploadMetaData(file: Upload!): UploadResponse
  }
`;

// Define the resolvers
const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    _: () => "GraphQL API is running",
  },

  Mutation: {
    uploadImage: async (_, { file }) => {
      try {
        const { createReadStream, filename } = await file;
        const ipfsHash = await uploadNftToIpfs({ createReadStream, filename });
        return {
          ipfsHash,
          success: true,
          message: "File successfully uploaded to IPFS",
        };
      } catch (error) {
        return {
          ipfsHash: null,
          success: false,
          message: `Failed to upload file: ${error.message}`,
        };
      }
    },
    uploadMetaData: async (_, { file }) => {
      try {
        const { createReadStream, filename } = await file;
        const ipfsHash = await uploadMetadataToIpfs({ createReadStream, filename });
        return {
          ipfsHash,
          success: true,
          message: "Metadata successfully uploaded to IPFS",
        };
      } catch (error) {
        return {
          ipfsHash: null,
          success: false,
          message: `Failed to upload metadata: ${error.message}`,
        };
      }
    },
  },
};

// Create and export the executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
