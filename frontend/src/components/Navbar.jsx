import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import logo from '../assets/decentrade-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Navbar.css'
import WalletButton from './WalletButton'
import { WalletContext } from '../context/WalletContext'

const Navbar = () => {
    const { isConnected } = useContext(WalletContext);

    const handleGithubClick = () => {
        window.open('https://github.com/4darsh-Dev/DecenTrade', '_blank')
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img
                        className="logo-img"
                        src={logo}
                        alt="DecenTrade Logo"
                    />
                </Link>
                <Link to="/">DecenTrade</Link>
            </div>
            <div className="navbar-links">
                {[
                    { name: 'Home', link: '/' },
                    { name: 'Explore', link: '/explore' },
                    { name: 'Create', link: '/create' },
                    { name: 'About', link: '/about' },
                    { name: 'Creators', link: '/creators' },
                    { name: 'FAQs', link: '/faqs' },
                ].map((item) => (
                    <Link
                        key={item.name}
                        to={item.link}
                        className="navbar-link"
                    >
                        {item.name}
                    </Link>
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
                <WalletButton />
            </div>
        </nav>
    )
}

export default Navbar