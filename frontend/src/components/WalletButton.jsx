import React, { useContext, useEffect, useState } from 'react'
import { WalletContext } from '../context/WalletContext'
import { Wallet, X, ChevronDown, ExternalLink } from 'lucide-react'

const WalletButton = () => {
  const { 
    isMetaMaskInstalled, 
    isConnected, 
    isConnecting,
    account, 
    networkId, 
    balance, 
    error, 
    connectWallet, 
    disconnectWallet,
    setError
  } = useContext(WalletContext)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (error) {
      alert(error)
      setError(null)
    }
  }, [error, setError])

  if (!isMetaMaskInstalled) {
    return (
      <a 
        href="https://metamask.io/download.html" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Install MetaMask
        <ExternalLink className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
      </a>
    )
  }

  if (isConnected && account && typeof account === 'string') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {`${account.slice(0, 6)}...${account.slice(-4)}`}
          <ChevronDown className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <p className="block px-4 py-2 text-sm text-gray-700">Network ID: {networkId || 'Unknown'}</p>
              <p className="block px-4 py-2 text-sm text-gray-700">Balance: {balance ? `${parseFloat(balance).toFixed(4)} ETH` : 'Loading...'}</p>
              <button
                onClick={() => {
                  disconnectWallet()
                  setIsDropdownOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900"
                role="menuitem"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting...
        </>
      ) : (
        <>
          Connect Wallet
          <Wallet className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </>
      )}
    </button>
  )
}

export default WalletButton