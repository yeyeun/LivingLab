import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';

const host = `${API_SERVER_HOST}/api/part`;

// 참여목록 조회
export const getPartUsers = async (teamNo) => {
  const res = await axios.get(`${host}/users/team/${teamNo}`);
  return res.data;
};

// 참여목록에 참여인원 추가
export const postAddPart = async (user, teamNo) => {
  const res = await axios.post(`${host}/add`, { user, teamNo });
  return res.data;
};

// 참여목록에서 참여인원 삭제
export const removePart = async (pino) => {
  const res = await axios.delete(`{host}/remove/${pino}`);
  return res.data;
};
