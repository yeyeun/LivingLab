import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  const header = { headers: { 'Content-Type': 'x-www-from-urlencoded' } };

  const form = new FormData();
  form.append('username', loginParam.email);
  form.append('password', loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);
  return res.data;
};
