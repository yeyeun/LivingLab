import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';

const host = `${API_SERVER_HOST}/mail`;

// 이메일 입력 시 인증번호 이메일로 발송
export const mailSend = async (email) => {
  const header = { headers: { 'Content-Type': 'application/json' } };
  const res = await axios.post(`${host}/send`, email , header);
  return res.data;
};