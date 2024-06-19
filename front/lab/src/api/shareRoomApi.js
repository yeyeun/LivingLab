import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/shareRoom`;

export const getList = async (pageParam, search, sort) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {params: { page: page, size: size, search: search, sort: sort }});
  return res.data;
};

export const getOne = async (roomNo) => {
  const res = await axios.get(`${prefix}/read/${roomNo}`);
  console.log(res);
  return res.data;
};

export const modify = async(roomNo,shareRoom) => {
  const header = {headers:{"Content-Type":"multipart/form-data"}};
  const res = await axios.put(`${prefix}/modify/${roomNo}`,shareRoom, header);
  return res.data;
};

export const postAddShareRoom = async (shareRoom) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post(`${prefix}/add`, shareRoom, header);
    return res.data;
}

export const deleteOne = async (roomNo) => {
  const res = await axios.delete(`${prefix}/${roomNo}`);
  console.log('deleting ', res.data);
  return res.data;
};
