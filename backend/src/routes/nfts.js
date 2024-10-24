import express from 'express'
import { getNfts } from '../controllers/nftController.js'

const router = express.Router()

// route for issuer to upload document and then uploading it to pinata
router.get('/getNfts', getNfts)
export default router
