import React from 'react';

import { useState } from 'react';

const ChatList = ({ onSelectChat }) => {
  const chats = [
    { id: 1, name: '이정운', lastMessage: '채팅 기능 생각 중이에요' },
    { id: 2, name: '유우상', lastMessage: '댓글 기능 만들고 있어요' },
    { id: 3, name: '최영은', lastMessage: '커뮤니티 다 완성했어요' },
    { id: 4, name: '안정호', lastMessage: '홈 화면 수정 중이에요' },
    // Add more dummy data as needed
  ];

  return (
    <div className="overflow-y-auto h-full">
      {chats.map((chat) => (
        <div key={chat.id} className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => onSelectChat(chat)}>
          <h2 className="text-lg font-bold">{chat.name}</h2>
          <p className="text-sm text-gray-500">{chat.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
