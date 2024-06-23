import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';

const host = `${API_SERVER_HOST}/chat`;

// 공동구매 작성자가 게시글 작성 시 자동으로 채팅방 생성, 입장
export const postCreateRoom = async (userId, createRequest) => {
  const res = await axios.post(`${host}/room/create`, createRequest, {
    params: { userId }
  });
  return res.data;
};

// 공동구매 채팅방의 유저 조회(참여하기 표시)
export const chatUserInfoBuy = async (buyNo) => {
  const res = await axios.get(`${host}/room/get/buy`, {
    params: { buyNo }
  });
  return res.data;
};

// 공동구매 채팅방 입장(참여)
export const enterChatRoom = async (formData) => {
  const response = await axios.post(`${host}/room/add`, formData);
      return response.data;
};

// 유저의 모든 채팅방 목록 반환
export const getChatRoom = async (userId) => {
  const res = await axios.get(`${host}/rooms`, { params: { userId } });
  return res.data;
};

// 특정 채팅방 삭제
export const deleteChatRoom = async (roomId) => {
  const res = await axios.delete(`${host}/room/delete/${roomId}`);
  return res.data;
};

// 채팅 기록 조회
export const getChatHistory = async (roomId) => {
  const res = await axios.get(`${host}/room/history/${roomId}`);
  return res.data;
};

