import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {motion } from 'framer-motion'
import { MessageSquareDot } from 'lucide-react'


const Chatbot = () => {

    const [messages, setMessages] = useState([
        { user: 'bot', text: 'Hello! How can I assist you with NFTs today?' },
    ])
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false) // State to control chat window visibility

    const navigate = useNavigate()
    const handleSendMessage = () => {
        if (input.trim()) {
            const userMessage = { user: 'me', text: input }
            setMessages([...messages, userMessage])
            setInput('')

            // Add bot's response logic here
            setTimeout(() => {
                const botResponse = getBotResponse(input.toLowerCase())
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { user: 'bot', text: botResponse },
                ])
            }, 1000)
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    const getBotResponse = (input) => {
        // Define bot responses based on user input
        if (input.includes('hi') || input.includes('hello')) {
            return 'Hello! Welcome to our NFT marketplace. How can I help you today?'
        } else if (
            input.includes('how are you') ||
            input.includes('how is it going')
        ) {
            return 'I’m just a bot, but I’m here to help you with NFTs! What would you like to know?'
        } else if (input.includes('how to collaborate')) {
            return 'Collaborating with other creators can expand your reach. Need ideas on how to collaborate?'
        } else {
            return 'Sorry, I didn’t understand that. Can you please rephrase your question or ask about buying/selling NFTs?'
        }
    }

    return (

        <div className="relative">
            {/* Chat Button */}
            <motion.button
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
                onClick={() => setIsOpen(!isOpen)} // Toggle chat window
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <MessageSquareDot size={24} />
            </motion.button>


             

            {/* Chat Window */}
            {isOpen && (
                <motion.div
                className="fixed bottom-16 right-4 bg-white p-6 rounded-lg shadow-lg z-50"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                    <button
                        className="fixed bottom-4 right-20 bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50"
                        onClick={() => navigate('/chat')}
                    >
                        Go to Chat Page
                    </button>
                    <div className="flex flex-col max-h-60 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`my-2 ${msg.user === 'bot' ? 'text-left' : 'text-right'}`}
                            >
                                <p
                                    className={`inline-block p-2 rounded-lg ${msg.user === 'bot' ? 'bg-gray-700' : 'bg-blue-500'}`}
                                >
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
                    </motion.div>
            )}
        
            
        </div>
    )
}

export default Chatbot
