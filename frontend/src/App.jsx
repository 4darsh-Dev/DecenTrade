import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NFTMarketplace from './components/NFTMarketplace'

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

function AppContent() {
    // const location = useLocation()
    // const isOrchardRoute = location.pathname === '/orchard'

    return (
        <>
            {/* <AnimatedCursor /> */}
            {/* <Navbar background={isOrchardRoute ? '#f4f4f4' : 'transparent'} /> */}
            <NFTMarketplace />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/profile-creation" element={<ProfileCreation />} />
                <Route path="/orchard" element={<OrchardPage />} />
                <Route path="/farm-management" element={<FarmManagement />} />
                <Route path="/models-report" element={<ModelsReport />} /> */}
            </Routes>
        </>
    )
}

export default App
