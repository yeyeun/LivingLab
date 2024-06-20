import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSend} className="flex p-4 bg-white border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        className="flex-1 p-2 border rounded-lg"
        placeholder="메시지를 입력하세요"
      />
      <button type="submit" className="ml-2 p-2 bg-teal-300 text-white rounded-lg">
        보내기
      </button>
    </form>
  );
};

export default ChatInput;
