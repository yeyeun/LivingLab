import React from 'react';

const ChatMessage = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
          <div className={`p-2 m-2 rounded-lg ${message.sender === 'me' ? 'bg-teal-300 text-white' : 'bg-gray-200'}`}>{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
