import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import ipfsRoutes from './src/routes/ipfs.js'
import nftRoutes from './src/routes/nfts.js'

const app = express()
// const authRoutes = require('./src/routes/auth')
// const uploadRoute = require('./src/routes/uploadDoc')
// const getDocsRoute = require('./src/routes/getDoc')
const port = process.env.PORT || 3000

app.use(express.json())
// app.use(cors({ origin: 'http://localhost:5173' }))

// Allow all origins for now to simplify the frontend setup
app.use(
  cors({
    origin: '*'
  })
)

app.use('/ipfs', ipfsRoutes)
app.use('/nfts', nftRoutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
