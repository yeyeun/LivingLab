import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/team`;

export const getOne = async (teamNo) => {
  const res = await axios.get(`${prefix}/read/${teamNo}`);
  return res.data;
};

export const getList = async (pageParam, search, sort, category) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {params: { page: page, size: size, search: search, sort: sort, category: category }});
  return res.data;
};

export const postAddTeam = async(team) => {
  const header = {headers:{"Content-Type":"multipart/form-data"}};
  const res = await axios.post(`${prefix}/add`, team, header);
  return res.data;
}

export const modify = async(teamNo, team) => {
  const header = {headers:{"Content-Type":"multipart/form-data"}};
  const res = await axios.put(`${prefix}/modify/${teamNo}`, team, header);
  return res.data;
}

export const deleteOne = async(teamNo) => {
  const res = await axios.delete(`${prefix}/delete/${teamNo}`);
  return res.data;
}

export const increaseLike = async(teamNo) => {
  const res = await axios.put(`${prefix}/increase/${teamNo}`);
  return res.data;
}

export const decreaseLike = async(teamNo) => {
  const res = await axios.put(`${prefix}/decrease/${teamNo}`);
  return res.data;
}

export const getLatestTeam = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/latest`, { params: { page: page, size: size } });
  return res.data;
}

/* 마이페이지 내가 작성한 글 조회 */
export const myList = async (id) => {
  const res = await axios.get(`${prefix}/mylist/${id}`);
  return res.data;
};

export const myListAll = async (id) => {
  const res = await axios.get(`${prefix}/mylistall/${id}`);
  return res.data;
};