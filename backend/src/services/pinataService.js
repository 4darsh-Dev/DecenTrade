import { PinataSDK } from 'pinata-web3'
// Configure IPFS
const pinataJwt = process.env.PINATA_JWT
const pinataGateway = process.env.PINATA_GATEWAY

const pinata = new PinataSDK({
  pinataJwt: pinataJwt,
  pinataGateway: pinataGateway
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
export const uploadToIPFS = async (fileName, fileBuffer) => {
  try {
    const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' })
    const file = new File([fileBlob], fileName, { type: 'application/pdf' })
    const upload = await pinata.upload.file(file)
    return upload.IpfsHash
  } catch (err) {
    console.error(err)
  }
}
export const uploadMetadataToIPFS = async (data) => {
  try {
    console.log(data, 'data')
    const response = await pinata.upload.json(data)
    return response.IpfsHash
  } catch (error) {
    console.error('Error uploading json data to IPFS:', error)
  }
}
