import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import ipfsRoutes from './src/routes/ipfs.js'
import nftRoutes from './src/routes/nfts.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Allow all origins for now to simplify the frontend setup
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],

  })
)

app.use('/ipfs', ipfsRoutes)
app.use('/nfts', nftRoutes)

// Error handling middleware to ensure CORS headers are sent even on errors
app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.status(err.status || 500).json({ error: err.message })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app