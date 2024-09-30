import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NFTMarketplace from './components/NFTMarketplace'
import CreateNFT from './pages/CreateNFTPage'
import ExplorePage from './pages/ExplorePage'
import { useState } from 'react'

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

function AppContent() {
    const [wallet, setWallet] = useState(null)
    return (
        <>
            {/* <AnimatedCursor /> */}
            {/* <Navbar /> */}
            <NFTMarketplace wallet={wallet} setWallet={setWallet} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateNFT wallet={wallet} />} />
                <Route path="/explore" element={<ExplorePage />} />
            </Routes>
        </>
    )
}

export default App
