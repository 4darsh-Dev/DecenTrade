import React from 'react'
import { Search } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-transparent">
            <div className="text-white text-2xl font-bold">ðNFT</div>
            <div className="hidden md:flex space-x-6">
                {[
                    'Perimoes',
                    'Hkire',
                    'Aubots',
                    'Ajens',
                    'Lights',
                    'Conet',
                ].map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        {item}
                    </a>
                ))}
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cenovem"
                        className="bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>
                <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-6 py-2 hover:opacity-90 transition-opacity">
                    Kouc/Otu
                </button>
            </div>
        </nav>
    )
}

export default Navbar
