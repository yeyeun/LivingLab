import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getChatRoom } from '../../../api/chatApi';

const ChatList = ({ onSelectChat }) => {
  const [ chatRooms, setChatRooms ] = useState('');
  const loginInfo = useSelector((state) => state.loginSlice);
  const id = loginInfo.id;

  useEffect(()=>{
    getChatRoom(id).then((response) => {
      setChatRooms(response);
    });
  }, [id]);


  return (
    <div className="h-full">
      {chatRooms.data && chatRooms.data.length > 0 ? (
      chatRooms.data.map((room) => 

        <div key={room.roomId} className="py-7 px-5 cursor-pointer hover:bg-gray-100 border-b flex items-center" onClick={() => onSelectChat(room)}>
          <img src="https://via.placeholder.com/40" alt="..." className="w-10 h-10 rounded-full mr-4" />
          <div>
            <h2 className="text-lg font-bold">{room.title}</h2>
            <p className="text-sm text-gray-500">채팅방 마지막 메세지</p>
          </div>
        </div>
        
      )
    )
    :
    (
      <div className="p-7 flex items-center">
        참여 중인 채팅방이 없습니다
      </div>
    )
    }
    </div>
  );
};

export default ChatList;
