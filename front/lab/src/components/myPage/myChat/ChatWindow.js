import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useState } from 'react';

const initState = {
  id: 0,
  text: '',
  sender: '',
};

const ChatWindow = ({ chat }) => {
  //const [messages, setMessages] = useState(initState);

  const [messages, setMessages] = useState([
    { id: 1, text: '안녕!', sender: 'other' },
    { id: 2, text: '잘 지내?', sender: 'me' },
  ]);

  const handleSend = (message) => {
    setMessages([...messages, { id: messages.length + 1, text: message, sender: 'me' }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-teal-500 text-white">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full w-10 h-10" />
          <span className="ml-2 text-lg font-bold">Username</span>
        </div>
        <div className="text-lg">Direct</div>
      </div>
      <ChatMessage messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
