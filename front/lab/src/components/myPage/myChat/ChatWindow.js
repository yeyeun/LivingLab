import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useState } from 'react';

const initState = {
  id: 0,
  text: '',
  sender: '',
};

const ChatWindow = ({ chat }) => {
  //const [messages, setMessages] = useState(initState);
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕!', sender: 'other' },
    { id: 2, text: '잘 지내?', sender: 'me' },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSend = (message) => {
    setMessages([...messages, { id: messages.length + 1, text: message, sender: 'me' }]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-gray-600 text-white rounded-t">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full w-10 h-10" />
          <span className="ml-2 text-lg font-bold">{chat.name}</span>
        </div>
        <div className="text-sm flex items-center">
          <span className="bg-mainColor px-2 py-1 mr-1 rounded-2xl">공동구매</span>
          곽티슈 같이 구매하실분
          <span className="bg-white px-3 py-1 ml-1 rounded-2xl text-black font-bold">2 / 3</span>
          <button 
            onClick={toggleSidebar} 
            className="ml-2 bg-gray-700 hover:bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            ☰
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 bg-slate-100 relative overflow-x-hidden">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {/* 참여자 목록 사이드바 */}
        <div
          className={`absolute top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } w-1/3`}
        >
          <div className="p-4 border-b">
            <h2 className="text-base font-bold">참여자 목록</h2>
            <button 
              onClick={toggleSidebar} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              &times;
            </button>
          </div>
          <div className="p-4 text-base">
            <ul>
              <li>참여자 1</li>
              <li>참여자 2</li>
            </ul>
          </div>
        </div>
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
