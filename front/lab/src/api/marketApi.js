import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/market`;

export const getOne = async (marketNo) => {
  const res = await axios.get(`${prefix}/read/${marketNo}`);
  return res.data;
};

export const getList = async (pageParam, search, sort) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {params: { page: page, size: size, search: search, sort: sort }});
  return res.data;
};

export const postAddMarket = async(market) => {
  const header = {headers:{"Content-Type":"multipart/form-data"}};
  const res = await axios.post(`${prefix}/add`, market, header);
  return res.data;
}

export const modify = async(marketNo, market) => {
  const header = {headers:{"Content-Type":"multipart/form-data"}};
  const res = await axios.put(`${prefix}/modify/${marketNo}`, market, header);
  return res.data;
}

export const deleteOne = async(marketNo) => {
  const res = await axios.delete(`${prefix}/delete/${marketNo}`);
  return res.data;
}

export const increaseLike = async(marketNo) => {
  const res = await axios.put(`${prefix}/increase/${marketNo}`);
  return res.data;
}

export const decreaseLike = async(marketNo) => {
  const res = await axios.put(`${prefix}/decrease/${marketNo}`);
  return res.data;
}

export const getLatestMarket = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/latest`, { params: { page: page, size: size } });
    return res.data;
  } 