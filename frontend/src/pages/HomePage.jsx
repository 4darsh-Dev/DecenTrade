import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import InfoCards from '../components/InfoCards'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <div className="min-h-screen ">
            <div className="bg-cover bg-center bg-[url('/src/assets/decen-bg2.jpg')]">
                <Navbar />
                <main className="container mx-auto px-4">
                    <HeroSection />
                    <InfoCards />
                </main>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default HomePage
