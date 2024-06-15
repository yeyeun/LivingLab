import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2 m-2 rounded-lg ${message.sender === 'me' ? 'bg-teal-300 text-white' : 'bg-gray-200'}`}>{message.text}</div>
    </div>
  );
};

export default ChatMessage;
