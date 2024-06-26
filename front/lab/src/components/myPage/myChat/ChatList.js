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


const getNonEmptyFieldsWithText = (room) => {
  const fields = [];

  if (room.buyNo !== null) {
      fields.push({ value: room.buyNo, text: '공동구매' });
  }
  if (room.teamNo !== null) {
      fields.push({ value: room.teamNo, text: '동네모임' });
  }
  if (room.marketNo !== null) {
      fields.push({ value: room.marketNo, text: '동네장터' });
  }
  if (room.roomNo !== null) {
      fields.push({ value: room.roomNo, text: '자취방쉐어' });
  }

  return fields;
};


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
