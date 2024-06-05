import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';

const host = `${API_SERVER_HOST}/api/user`;

export const loginPost = async (loginParam) => {
  const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };

  const form = new FormData();
  form.append('username', loginParam.email);
  form.append('password', loginParam.pwd);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

// 리액트에서 api 서버 호출
export const modifyUser = async (user) => {
  // 로그인한 사용자 기준으로 axios 처리 (JSON으로 바로 보냄)
  // 파라미터 전달값은 user를 SocialController로 전달
  const res = await axios.put(`${host}/modify`, user);
  return res.data;
};

// 회원정보 조회
export const getUser = async (id) => {
  const res = await axios.get(`${host}/${id}`);
  return res.data;
};
