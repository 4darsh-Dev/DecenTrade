import React from 'react';
import { BotMessageSquare, User } from 'lucide-react';

const ChatMessage = ({ message, type }) => {
  const isBot = type === 'bot';
  
  return (
    <div className={`flex items-start space-x-3 mb-4 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`
        p-3 rounded-xl max-w-[70%]
        ${isBot 
          ? 'bg-gray-700 text-white' 
          : 'bg-blue-600 text-white self-end'
        }
      `}>
        <p>{message}</p>
      </div>
      <div className={`
        rounded-full p-2 
        ${isBot 
          ? 'bg-gray-600 text-white' 
          : 'bg-blue-500 text-white'
        }
      `}>
        {isBot ? <BotMessageSquare size={20} /> : <User size={20} />}
      </div>
    </div>
  );
};

export default ChatMessage;