import React, { useState, useEffect, useRef } from 'react';
import { Client } from "@gradio/client";
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { RiseLoader } from 'react-spinners';
import VoiceInput from '../components/VoiceInput';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Load messages from local storage on initial render
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    setMessages(savedMessages);
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    // Save messages to local storage
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    // Create a new message for the user
    const newUserMessage = { text: userMessage, type: 'user' };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      setIsLoading(true);
      
      // Connect to Gradio client
      const client = await Client.connect("4darsh-Dev/orchard_eyes-chatbot");
    //   const result = await client.predict("/chat", { message: userMessage });
       const result = {
        data: ["Hello sir, I am here to help you, Under Maintenance Mode For Now."]
      };
      
      
      // Add bot response
      const botResponse = { text: result.data[0], type: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { 
        text: "Sorry, there was an error processing your request.", 
        type: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


    const handleVoiceInputComplete = (transcribedText) => {
        // Send transcribed text to Gradio or process as needed
        handleSendMessage(transcribedText);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Chat Messages Container */}
        <div 
          ref={chatContainerRef}
          className="h-[70vh] overflow-y-auto p-6 space-y-4"
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.type === 'user' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage 
                  message={msg.text} 
                  type={msg.type} 
                />
              </motion.div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-300">
                Generating response...
                
                <RiseLoader color={"#fff"} size={16} loading={isLoading}  />
            </div>
              
            )}
          </AnimatePresence>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-700/50">
          <ChatInput 
            onSendMessage={handleSendMessage}
            // onVoiceInput={handleVoiceInput}
          />
        </div>

        {/* Voice Input Modal */}
        <VoiceInput onVoiceInputComplete={handleVoiceInputComplete} />

      </motion.div>
    </div>

    
  );
};

export default ChatPage;