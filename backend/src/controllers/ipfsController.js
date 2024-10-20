import {
  testIpfs,
  uploadMetadataToIPFS,
  uploadToIPFS
} from '../services/pinataService.js'

export const uploadNftToIpfs = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
    }
    const testing = await testIpfs()
    const fileName = req.file.originalname
    const fileBuffer = req.file.buffer
    const ipfsHash = await uploadToIPFS(fileName, fileBuffer)
    res.status(200).json({ ipfsHash })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}
export const uploadMetadataToIpfs = async (req, res) => {
  try {
    const { name, description, image } = JSON.parse(req.body.metadata)
    if (!name || !description || !image) {
      res.status(400).json({ error: 'Missing metadata' })
      return
    }
    const data = { name, description, image }
    await testIpfs()
    const ipfsHash = await uploadMetadataToIPFS(data)
    res.status(200).json({ ipfsHash })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}
