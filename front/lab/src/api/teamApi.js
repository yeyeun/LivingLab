import axios from "axios";
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/team`;


export const getOne = async (teamNo) => {
  const res = await axios.get(`${prefix}/read/${teamNo}`)
  return res.data
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, { params: { page: page, size: size } });
  return res.data;
};