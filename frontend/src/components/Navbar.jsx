import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import logo from '../assets/decentrade-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Navbar.css'
import { connectWallet, mintNFT } from '../utils/ethereum'

const Navbar = ({ wallet, setWallet }) => {
    const [tokenURI, setTokenURI] = useState('')
    const [showMintOption, setShowMintOption] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isMenuOpen]);

    const handleGithubClick = () => {
        window.open('https://github.com/4darsh-Dev/DecenTrade', '_blank')
    }

    const connect = async () => {
        const signer = await connectWallet()
        setWallet(signer)
        setShowMintOption(true) // Show mint option after wallet is connected
    }

    const handleMint = async () => {
        if (wallet && tokenURI) {
            try {
                await mintNFT(wallet, tokenURI)
                alert('NFT minted successfully!')
                setTokenURI('') // Clear the input after successful mint
            } catch (error) {
                console.error('Error minting NFT:', error)
                alert('Failed to mint NFT. Please try again.')
            }
        } else {
            alert('Please enter a token URI.')
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
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
                        className={`navbar-link ${location.pathname === item.link ? 'active' : ''}`}
                        onClick={toggleMenu}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className={`navbar-actions ${isMenuOpen ? 'active' : ''}`}>
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
                {wallet ? (
                    <button
                        className="connect-wallet-button"
                        style={{ backgroundColor: 'green' }}
                    >
                        Wallet Connected
                    </button>
                ) : (
                    <button onClick={connect} className="connect-wallet-button">
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
