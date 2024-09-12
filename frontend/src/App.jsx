import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NFTMarketplace from './components/NFTMarketplace'
import CreateNFT from './pages/CreateNFTPage'
import ExplorePage from './pages/ExplorePage'

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

function AppContent() {
    return (
        <>
            {/* <AnimatedCursor /> */}
            {/* <Navbar background={isOrchardRoute ? '#f4f4f4' : 'transparent'} /> */}
            <NFTMarketplace />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateNFT />} />
                <Route path="/explore" element={<ExplorePage />} />
            </Routes>
        </>
    )
}

export default App
