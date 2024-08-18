import { ethers } from 'ethers';

let provider;
let signer;

if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
} else {
    console.error('No Ethereum provider detected');
}

export { provider, signer };

// Handle chain and account changes

if (window.ethereum) {
    window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
    });

    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            console.log('Account changed to:', accounts[0]);
        } else {
            console.log('Please connect to MetaMask');
        }
    });
}