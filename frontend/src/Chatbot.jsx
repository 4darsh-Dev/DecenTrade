import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { user: 'bot', text: 'Hello! How can I assist you with NFTs today?' },
    ]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false); // State to control chat window visibility

    const handleSendMessage = () => {
        if (input.trim()) {
            const userMessage = { user: 'me', text: input };
            setMessages([...messages, userMessage]);
            setInput('');

            // Add bot's response logic here
            setTimeout(() => {
                const botResponse = getBotResponse(input.toLowerCase());
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { user: 'bot', text: botResponse },
                ]);
            }, 1000);
        }
    };

    const getBotResponse = (input) => {
        // Define bot responses based on user input
        if (input.includes('hi') || input.includes('hello')) {
            return 'Hello! Welcome to our NFT marketplace. How can I help you today?';
        } else if (input.includes('how are you') || input.includes('how is it going')) {
            return 'I’m just a bot, but I’m here to help you with NFTs! What would you like to know?';
        } else if (input.includes('thank you') || input.includes('thanks')) {
            return 'You’re welcome! If you have more questions, feel free to ask.';
        } else if (input.includes('goodbye') || input.includes('bye')) {
            return 'Goodbye! Have a great day! If you have more questions, feel free to return.';
        } else if (input.includes('buy nft')) {
            return 'To buy an NFT, visit our marketplace, find a piece you like, click "Buy", and connect your wallet. Would you like help with that?';
        } else if (input.includes('sell nft')) {
            return 'To sell an NFT, connect your wallet, go to the "My NFTs" section, and list your NFT. Do you need assistance with the process?';
        } else if (input.includes('mint nft')) {
            return 'Minting an NFT involves uploading your artwork and setting metadata. Do you need help with that?';
        } else if (input.includes('what is an nft')) {
            return 'NFT stands for Non-Fungible Token, a unique digital asset verified using blockchain technology. Would you like to know more?';
        } else if (input.includes('wallet')) {
            return 'You’ll need a crypto wallet like MetaMask to manage your NFTs. Would you like guidance on setting it up?';
        } else if (input.includes('price') || input.includes('cost')) {
            return 'NFT prices vary based on demand and rarity. Would you like to explore current prices in our marketplace?';
        } else if (input.includes('blockchain')) {
            return 'NFTs are primarily created on Ethereum, but other blockchains like Polygon and Solana are also popular. Interested in a specific one?';
        } else if (input.includes('gas fees')) {
            return 'Gas fees are costs incurred for transactions on a blockchain. Would you like tips on reducing these fees?';
        } else if (input.includes('marketplace')) {
            return 'Our marketplace features a variety of NFTs. Would you like to see some collections?';
        } else if (input.includes('top creators') || input.includes('best nfts')) {
            return 'We showcase works from top creators. Would you like help finding specific artists or genres?';
        } else if (input.includes('art') || input.includes('digital art')) {
            return 'We have a stunning collection of digital art NFTs. Would you like to browse or learn more about a particular piece?';
        } else if (input.includes('music')) {
            return 'You can find unique music NFTs from various artists. Interested in exploring music collections?';
        } else if (input.includes('collectibles')) {
            return 'We feature various digital collectibles. Would you like to learn more about them?';
        } else if (input.includes('how to create an nft')) {
            return 'To create an NFT, you need to upload your digital file, set metadata, and mint it on a blockchain. Would you like a step-by-step guide?';
        } else if (input.includes('royalties')) {
            return 'NFT creators can set royalties for future sales. Would you like to know how to set those up?';
        } else if (input.includes('rareness') || input.includes('rare')) {
            return 'The rarity of an NFT can affect its value. Would you like tips on assessing rarity?';
        } else if (input.includes('trends')) {
            return 'NFT trends can shift quickly. Would you like insights on current trends?';
        } else if (input.includes('scams')) {
            return 'Be cautious of scams in the NFT space. Always verify sources before making transactions. Need help identifying scams?';
        } else if (input.includes('community')) {
            return 'We have a vibrant community of NFT enthusiasts. Would you like to know how to get involved?';
        } else if (input.includes('news')) {
            return 'For the latest NFT news, check our blog section. Would you like a link?';
        } else if (input.includes('events')) {
            return 'We host various NFT events and webinars. Would you like to learn about upcoming events?';
        } else if (input.includes('support')) {
            return 'If you need support, please visit our help center or contact customer service. Do you need more specific assistance?';
        } else if (input.includes('faq') || input.includes('questions')) {
            return 'You can find answers to common questions in our FAQ section. Would you like me to direct you there?';
        } else if (input.includes('create an account')) {
            return 'To create an account, visit our signup page. Would you like a link?';
        } else if (input.includes('login')) {
            return 'If you have an account, you can log in on our homepage. Need help with that?';
        } else if (input.includes('lost password')) {
            return 'If you forgot your password, click "Forgot Password" on the login page. Would you like assistance?';
        } else if (input.includes('transaction history')) {
            return 'You can view your transaction history in your account settings. Need help finding it?';
        } else if (input.includes('how to connect wallet')) {
            return 'You can connect your wallet through the settings menu on our site. Would you like step-by-step instructions?';
        } else if (input.includes('verify account')) {
            return 'To verify your account, check your email for a confirmation link. Need help with verification?';
        } else if (input.includes('security')) {
            return 'We prioritize your security. Always enable two-factor authentication. Would you like to know more about our security measures?';
        } else if (input.includes('what are smart contracts')) {
            return 'Smart contracts are self-executing contracts with the terms directly written into code. Would you like more details?';
        } else if (input.includes('artwork')) {
            return 'We have a variety of artwork NFTs. Would you like to explore specific types?';
        } else if (input.includes('playable NFTs')) {
            return 'Playable NFTs allow you to use assets in games. Interested in finding games that feature them?';
        } else if (input.includes('virtual worlds')) {
            return 'NFTs are increasingly used in virtual worlds. Would you like to learn about those?';
        } else if (input.includes('investment')) {
            return 'Investing in NFTs can be risky; do your research before buying. Would you like tips on evaluating NFTs as investments?';
        } else if (input.includes('how to withdraw funds')) {
            return 'To withdraw funds, visit your account settings and follow the withdrawal process. Need more specific guidance?';
        } else if (input.includes('connect with creators')) {
            return 'You can connect with creators through our platform. Interested in specific creators?';
        } else if (input.includes('sell artwork')) {
            return 'You can sell your artwork by minting it as an NFT. Would you like to know how to do that?';
        } else if (input.includes('buy collectibles')) {
            return 'You can buy collectibles from various collections on our marketplace. Would you like to browse?';
        } else if (input.includes('music NFTs')) {
            return 'We offer a selection of music NFTs from emerging artists. Want to check them out?';
        } else if (input.includes('faq')) {
            return 'You can find answers to frequently asked questions in our FAQ section. Do you need help with a specific question?';
        } else if (input.includes('how to promote nft')) {
            return 'Promoting your NFT can be done via social media and NFT communities. Need more tips?';
        } else if (input.includes('how to set a price')) {
            return 'Setting a price can depend on various factors like rarity and demand. Would you like detailed guidance?';
        } else if (input.includes('how to find buyers')) {
            return 'Finding buyers often involves marketing your NFTs effectively. Interested in strategies?';
        } else if (input.includes('how to build community')) {
            return 'Building a community can involve engaging with followers on social media. Would you like more tips?';
        } else if (input.includes('how to collaborate')) {
            return 'Collaborating with other creators can expand your reach. Need ideas on how to collaborate?';
        } else {
            return 'Sorry, I didn’t understand that. Can you please rephrase your question or ask about buying/selling NFTs?';
        }
    };

    return (
        <div className="relative">
            {/* Chat Button */}
            <button
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50"
                onClick={() => setIsOpen(!isOpen)} // Toggle chat window
            >
                💬
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-4 w-80 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50">
                    <div className="flex flex-col max-h-60 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`my-2 ${msg.user === 'bot' ? 'text-left' : 'text-right'}`}>
                                <p className={`inline-block p-2 rounded-lg ${msg.user === 'bot' ? 'bg-gray-700' : 'bg-blue-500'}`}>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-2">
                        <input
                            type="text"
                            className="flex-grow p-2 border rounded-l-lg border-gray-600 bg-gray-700 text-white"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-500 transition-colors"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
