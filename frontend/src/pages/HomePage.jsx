import React from 'react'
import HeroSection from '../components/HeroSection'
import InfoCards from '../components/InfoCards'
import '../styles/home_resp.css'


const HomePage = () => {
    return (
        <div className="min-h-screen">
            <div className=" main-bg-div bg-cover bg-center bg-[url('/src/assets/decen-bg2.webp')]">
                <main className="container mx-auto px-4">
                    <HeroSection />
                    <InfoCards />
                </main>
            </div>


        </div>
    )
}

export default HomePage
