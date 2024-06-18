import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';

const host = `${API_SERVER_HOST}/api/part`;

// 공동구매 참여목록 조회
export const getBuyPartUsers = async (buyNo) => {
  const res = await axios.get(`${host}/users/buy/${buyNo}`);
  return res.data;
};

// 공동구매 참여목록에 참여인원 추가
export const postAddBuyPart = async (user, buyNo) => {
  const res = await axios.post(`${host}/buy/add`, user, { params: { buyNo } }); //  { params: { teamNo } } 로 수정
  return res.data;
};

// 동네모임 참여목록 조회
export const getPartUsers = async (teamNo) => {
  const res = await axios.get(`${host}/users/team/${teamNo}`);
  return res.data;
};

// 동네모임 참여목록에 참여인원 추가
export const postAddPart = async (user, teamNo) => {
  const res = await axios.post(`${host}/team/add`, user, { params: { teamNo } }); //  { params: { teamNo } } 로 수정
  return res.data;
};

// 참여목록에서 참여인원 삭제
export const removePart = async (pino) => {
  const res = await axios.delete(`{host}/delete/${pino}`);
  return res.data;
};
