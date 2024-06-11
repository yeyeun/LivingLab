import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/team`;

export const getOne = async (teamNo) => {
  const res = await axios.get(`${prefix}/read/${teamNo}`);
  return res.data;
};

export const getList = async (pageParam, search, sort) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {params: { page: page, size: size, search: search, sort: sort }});
  return res.data;
};

export const postAddTeam = async(team) => {
  const header = {headers:{"Content-Type":"multipart/form-data"}};
  const res = await axios.post(`${prefix}/add`, team, header);
  return res.data;
}