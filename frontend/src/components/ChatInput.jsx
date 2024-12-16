import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

//   const handleVoiceInput = () => {
//     // Implement voice input functionality
//     onVoiceInput();
//   };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-2 space-x-2 shadow-lg border border-gray-200/20"
    >
      <input 
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow bg-transparent outline-none text-white placeholder-gray-300 px-2"
      />
      {/* <button 
        type="button" 
        onClick={handleVoiceInput}
        className="text-gray-300 hover:text-white transition-colors"
      >
        <Mic size={24} />
      </button> */}
      <button 
        type="submit" 
        className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;