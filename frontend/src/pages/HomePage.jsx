import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import InfoCards from '../components/InfoCards'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <div className="bg-cover bg-center bg-[url('/src/assets/decen-bg2.webp')]">
                <main className="container mx-auto px-4">
                    <HeroSection />
                    <InfoCards />
                </main>
                <div className='text-center bg-transparent py-3 font-bold'>
                <p className='text-white bold text-4xl'>Easily connect <span className='text-custom'>your</span> wallet for safe and secure transactions</p>
            </div>
            </div>
            
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default HomePage
