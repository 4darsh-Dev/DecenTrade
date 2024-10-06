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
                    'Home',
                    'Explore',
                    'About',
                    'Creators',
                    'How It Works',
                    'FAQ',
                ].map((item) => (
                    <a key={item} href="#" className="navbar-link">
                        {item}
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
