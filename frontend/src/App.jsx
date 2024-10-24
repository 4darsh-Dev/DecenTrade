import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import NFTMarketplace from './components/NFTMarketplace';
import ExplorePage from './pages/ExplorePage';
import AboutPage from './pages/AboutPage';
import CreatorsPage from './pages/CreatorsPage';
import FAQPage from './pages/FAQPage';
import Navbar from './components/Navbar';
import CreateNFT from './pages/CreateNFTPage';
import NotFoundPage from './components/NotFoundPage';
import Footer from './components/Footer'; // Import Footer component
import MyChatbot from './Chatbot'; // Import Chatbot component
import CustomCursor from './components/CustomCursor'

function App() {
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        console.log(wallet);
    }, [wallet]);

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Navbar wallet={wallet} setWallet={setWallet} />
                <main className="flex-grow">
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage wallet={wallet} setWallet={setWallet} />}
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
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>

                {/* Add Chatbot component at the bottom of the page */}
                <MyChatbot />

                {/* Add Footer component */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
