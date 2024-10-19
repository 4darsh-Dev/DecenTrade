import express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import {
  uploadNftToIpfs,
  uploadMetadataToIpfs
} from '../controllers/ipfsController.js'

const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })
// route for issuer to upload document and then uploading it to pinata
router.post('/uploadImage', upload.single('file'), uploadNftToIpfs)
router.post('/uploadMetaData', upload.single('file'), uploadMetadataToIpfs)
export default router
