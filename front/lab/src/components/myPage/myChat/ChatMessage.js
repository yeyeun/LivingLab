import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div>
      {message.sender === 'me'? (
        <div className="flex justify-end">
          <div className="px-4 py-2 m-2 rounded-3xl text-lg bg-mainColor text-white shadow">{message.text}</div>
        </div>
      )
      :
      (
        <div className="flex justify-start">
          <div className="px-4 py-2 m-2 rounded-3xl text-lg bg-white text-black shadow">{message.text}</div>
        </div>
      )
    }
    </div>
  );
};

export default ChatMessage;
