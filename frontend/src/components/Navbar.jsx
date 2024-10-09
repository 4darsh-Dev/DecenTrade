import React from 'react'
import { Search } from 'lucide-react'
import logo from '../assets/decentrade-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Navbar.css' // Import the new CSS file

const Navbar = () => {
    const handleGithubClick = () => {
        window.open('https://github.com/4darsh-Dev/DecenTrade', '_blank')
    }
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">
                    <img
                        className="logo-img"
                        src={logo}
                        alt="DecenTrade Logo"
                    />
                </a>
                <a href="/">DecenTrade</a>
            </div>
            <div className="navbar-links">
                {[
                    { name: 'Home', link: '/' },
                    { name: 'Explore', link: '/explore' },
                    { name: 'About', link: '/about' },
                    { name: 'Creators', link: '/creators' },
                    { name: 'How It Works', link: '/how-it-works' },
                    { name: 'FAQs', link: '/faqs' },
                ].map((item) => (
                    <a key={item.name} href={item.link} className="navbar-link">
                        {item.name}

                    </a>
                ))}
            </div>
            <div className="navbar-actions">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search NFTs"
                        className="search-input"
                    />
                    <Search className="search-icon" size={20} />
                </div>
                <button onClick={handleGithubClick} className="github-button">
                    Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
