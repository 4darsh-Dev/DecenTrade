import { create } from 'ipfs-http-client';

// Connect to a public IPFS node
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export const uploadToIPFS = async (file) => {
    try {
        const added = await ipfs.add(file);
        return added.path;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
    }
};

export const getFromIPFS = async (cid) => {
    try {
        const stream = ipfs.cat(cid);
        let data = '';
        for await (const chunk of stream) {
            data += new TextDecoder().decode(chunk);
        }
        return data;
    } catch (error) {
        console.error('Error getting file from IPFS:', error);
    }
};