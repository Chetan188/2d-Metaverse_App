import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatBoxProps {
  isDarkMode: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ isDarkMode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputText,
      sender: 'You',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');

    // Simulate a response
    setTimeout(() => {
      const responseMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        text: 'This is a simulated response.',
        sender: 'Bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, responseMessage]);
    }, 1000);
  };

  return (
    <div className={`mt-4 w-96 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md transition-colors duration-300`}>
      <div className={`${isDarkMode ? 'bg-blue-700' : 'bg-blue-500'} text-white p-2 rounded-t-lg flex justify-between items-center`}>
        <h3 className="font-bold">Chat</h3>
        <button className={`${isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-600'} rounded p-1`}>
          <X size={20} />
        </button>
      </div>
      <div className="h-64 p-4 overflow-y-auto">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg ${
              message.sender === 'You'
                ? isDarkMode ? 'bg-blue-900 text-right' : 'bg-blue-100 text-right'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <span className="font-bold">{message.sender}: </span>
            {message.text}
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={`p-4 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'} flex`}>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
          className={`flex-grow px-3 py-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className={`${isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;