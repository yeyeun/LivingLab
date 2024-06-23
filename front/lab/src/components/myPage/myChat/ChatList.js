import React from 'react';

const ChatList = ({ onSelectChat }) => {
  const chats = [
    { id: 1, name: '이정운', lastMessage: '채팅 기능 생각 중이에요', img: 'https://via.placeholder.com/40' },
    { id: 2, name: '유우상', lastMessage: '댓글 기능 만들고 있어요', img: 'https://via.placeholder.com/40' },
    { id: 3, name: '최영은', lastMessage: '커뮤니티 다 완성했어요', img: 'https://via.placeholder.com/40' },
    { id: 4, name: '안정호', lastMessage: '홈 화면 수정 중이에요', img: 'https://via.placeholder.com/40' },
    { id: 5, name: '이정운', lastMessage: '채팅 기능 생각 중이에요', img: 'https://via.placeholder.com/40' },
    { id: 6, name: '유우상', lastMessage: '댓글 기능 만들고 있어요', img: 'https://via.placeholder.com/40' },
    { id: 7, name: '최영은', lastMessage: '커뮤니티 다 완성했어요', img: 'https://via.placeholder.com/40' },
    { id: 8, name: '안정호', lastMessage: '홈 화면 수정 중이에요', img: 'https://via.placeholder.com/40' },
    { id: 9, name: '이정운', lastMessage: '채팅 기능 생각 중이에요', img: 'https://via.placeholder.com/40' },
    { id: 10, name: '유우상', lastMessage: '댓글 기능 만들고 있어요', img: 'https://via.placeholder.com/40' }
    // Add more dummy data as needed
  ];

  return (
    <div className="h-full">
      {chats.map((chat) => (
        <div key={chat.id} className="py-7 px-5 cursor-pointer hover:bg-gray-100 border-b flex items-center" onClick={() => onSelectChat(chat)}>
          <img src={chat.img} alt={chat.name} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-bold">{chat.name}</h2>
            <p className="text-sm text-gray-500">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
