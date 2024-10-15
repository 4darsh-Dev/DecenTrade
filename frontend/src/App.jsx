import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import NFTMarketplace from './components/NFTMarketplace'
import ExplorePage from './pages/ExplorePage'
import AboutPage from './pages/AboutPage'
import CreatorsPage from './pages/CreatorsPage'
import FAQPage from './pages/FAQPage'
import Navbar from './components/Navbar'
import CreateNFT from './pages/CreateNFTPage'
function App() {
    const [wallet, setWallet] = useState(null)
    useEffect(() => {
        console.log(wallet)
    }, [wallet])
    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <div className="">
                    <Navbar wallet={wallet} setWallet={setWallet} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage
                                    wallet={wallet}
                                    setWallet={setWallet}
                                />
                            }
                        />
                        <Route
                            path="/marketplace"
                            element={<NFTMarketplace wallet={wallet} />}
                        />
                        <Route
                            path="/create"
                            element={<CreateNFT wallet={wallet} />}
                        />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/creators" element={<CreatorsPage />} />
                        <Route path="/faqs" element={<FAQPage />} />
                        <Route path="/create" element={<CreateNFT />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
