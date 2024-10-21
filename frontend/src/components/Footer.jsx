// src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTwitter,
    faFacebook,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/decentrade-logo.png';
import Chatbot from '../Chatbot'; // Import the Chatbot component

const Footer = () => {
    const waveRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (waveRef.current) {
                waveRef.current.style.transform = `translate3d(0, ${scrollPosition * 0.1}px, 0)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer className="bg-gray-900 mt-12 text-white relative pt-20 pb-10">
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg
                    ref={waveRef}
                    className="w-full h-20"
                    viewBox="0 0 1440 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#4B0082"
                        fillOpacity="0.5"
                        d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    />
                </svg>
            </div>
            <div className="container mx-auto px-4">
                {/* Your existing footer content */}
                <div className="mt-10 pt-8 border-t border-gray-800 flex justify-between items-center">
                    <p className="text-gray-400">
                        &copy; 2024 DecenTrade. All rights reserved. Powered by Open Source
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
            <Chatbot /> {/* Add the Chatbot component here */}
        </footer>
    );
};

export default Footer;
