import { useParams } from 'react-router-dom';
import { useState } from 'react';

import ChatList from '../../../components/myPage/myChat/ChatList';
import ChatWindow from '../../../components/myPage/myChat/ChatWindow';

const MyChatPage = () => {
  const { id } = useParams();

  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="text-xl p-4 flex-grow">
      <div className="bg-slate-50 w-4/5 rounded-md px-10 py-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-2xl pl-2 my-2 border-l-4 font-Jua border-teal-300">채팅목록</div>
                <div className="flex">
                  <div className="w-1/3 border-r border-gray-300">
                    <ChatList onSelectChat={handleChatSelect} />
                  </div>
                  <div className="w-2/3">
                    {selectedChat ? (
                      <ChatWindow chat={selectedChat} />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">채팅 목록 중 채팅할 사람을 선택하세요</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChatPage;
