import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';

const host = `${API_SERVER_HOST}/api/user`;

// 로그인
export const loginPost = async (loginParam) => {
  //const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };
  const header = { headers: { 'Content-Type': 'application/json' } };

  const form = new FormData();
  form.append('email', loginParam.email);
  form.append('pwd', loginParam.pwd);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const modifyUser = async (user) => {
  // 로그인한 사용자 기준으로 axios 처리 (JSON으로 바로 보냄)
  const res = await axios.put(`${host}/modify`, user);
  return res.data;
};

// 회원정보 조회
export const getUser = async (id) => {
  const res = await axios.get(`${host}/${id}`);
  return res.data;
};
