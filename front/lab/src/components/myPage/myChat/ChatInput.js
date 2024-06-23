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

  const onKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleSend(e);
    }
  }

  return (
    <form onSubmit={handleSend} className="flex p-4 bg-white border-t rounded-b">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 p-2 border rounded-3xl text-base"
        placeholder="메시지를 입력하세요"
      />
      <button type="submit" className="ml-2 p-2 bg-teal-400 hover:bg-teal-500 text-white rounded-lg text-base">
        보내기
      </button>
    </form>
  );
};

export default ChatInput;
