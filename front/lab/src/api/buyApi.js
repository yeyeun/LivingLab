import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/buy`;

export const getOne = async (buyNo) => {
  const res = await axios.get(`${prefix}/read/${buyNo}`);
  return res.data;
};

export const getList = async (pageParam, search, sort) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size, search: search, sort: sort } });
  return res.data;
};
