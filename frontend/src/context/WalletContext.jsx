import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkMetaMaskInstallation();
    checkConnection();
  }, []);

  const checkMetaMaskInstallation = () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsMetaMaskInstalled(true);
    }
  };

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const account = accounts[0];
          const network = await provider.getNetwork();
          const balance = await provider.getBalance(account);
          setAccount(account);
          setNetworkId(network.chainId);
          setBalance(ethers.formatEther(balance));
          setIsConnected(true);
        }
      } catch (err) {
        console.error("Failed to check existing connection:", err);
      }
    }
  };

  const connectWallet = useCallback(async () => {
    if (isConnecting) return;

    try {
      setIsConnecting(true);
      setError(null);

      if (!isMetaMaskInstalled) {
        throw new Error('Please install MetaMask to connect your wallet.');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const account = accounts[0];
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(account);

      setAccount(account);
      setNetworkId(network.chainId);
      setBalance(ethers.formatEther(balance));
      setIsConnected(true);
    } catch (err) {
      if (err.code === -32002) {
        setError('Connection request already pending. Please check MetaMask.');
      } else {
        setError('Failed to connect wallet: ' + err.message);
      }
    } finally {
      setIsConnecting(false);
    }
  }, [isMetaMaskInstalled, isConnecting]);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setNetworkId(null);
    setBalance(null);
    setIsConnected(false);
  }, []);

  const switchNetwork = useCallback(async (chainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.toQuantity(chainId) }],
      });
    } catch (err) {
      setError('Failed to switch network: ' + err.message);
    }
  }, []);

  const sendTransaction = useCallback(async (to, amount) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: to,
        value: ethers.parseEther(amount)
      });
      await tx.wait();
      return tx.hash;
    } catch (err) {
      setError('Failed to send transaction: ' + err.message);
    }
  }, []);

  const value = {
    isMetaMaskInstalled,
    isConnected,
    isConnecting,
    account,
    networkId,
    balance,
    error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    sendTransaction,
    setError // Add this so we can clear errors from the button component
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};