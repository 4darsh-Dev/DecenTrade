import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import InfoCards from '../components/InfoCards'

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900">
            <Navbar />
            <main className="container mx-auto px-4">
                <HeroSection />
                <InfoCards />
            </main>
        </div>
    )
}

export default HomePage
