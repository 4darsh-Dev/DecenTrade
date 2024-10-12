import { PinataSDK } from 'pinata-web3'
// Configure IPFS
const pinataJwt = import.meta.env.VITE_PINATA_JWT
const pinataGateway = import.meta.env.VITE_PINATA_GATEWAY

const pinata = new PinataSDK({
    pinataJwt: pinataJwt,
    pinataGateway: pinataGateway,
})
export const testIpfs = async () => {
    try {
        const response = await pinata.testAuthentication()
        return response
    } catch (error) {
        console.error('Error testing IPFS:', error)
        throw error
    }
}
export const uploadToIPFS = async (file) => {
    try {
        const upload = await pinata.upload.file(file)
        return upload.IpfsHash
    } catch (err) {
        console.error(err)
    }
}
export const uploadMetadataToIPFS = async (data) => {
    try {
        const response = await pinata.upload.json(data)
        return response.IpfsHash
    } catch (error) {
        console.error('Error uploading json data to IPFS:', error)
    }
}
