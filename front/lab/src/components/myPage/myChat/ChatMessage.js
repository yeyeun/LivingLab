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
        <div className="flex justify-start items-center ml-2">
          <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full w-10 h-10" />
          <div className="px-4 py-2 m-2 rounded-3xl text-lg bg-white text-black shadow">{message.text}</div>
        </div>
      )
    }
    </div>
  );
};

export default ChatMessage;
