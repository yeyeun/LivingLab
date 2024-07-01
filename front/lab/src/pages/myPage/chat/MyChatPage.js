import { useState } from 'react';

import ChatList from '../../../components/myPage/myChat/ChatList';
import ChatWindow from '../../../components/myPage/myChat/ChatWindow';

const MyChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (room) => {
    setSelectedChat(room);
  };

  return (
    <div className="text-xl flex-grow h-screen flex w-4/5">
      <div className="bg-white w-full rounded h-4/5 shadow-md flex flex-col">

        <div className="flex-grow flex flex-col h-full">
          <div id="chatall" className="flex-grow flex h-0">
            <div className="w-1/3 overflow-y-auto no-scrollbar">
              <ChatList onSelectChat={handleChatSelect} />
            </div>
            <div className="w-2/3">
              {selectedChat ? (
                <ChatWindow room={selectedChat}/>
              ) : (
                <div id="chatwin" className="flex items-center justify-center h-full border-l border-gray-300">
                  <p className="text-gray-600">채팅 목록 중 채팅할 방을 선택하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default MyChatPage;
