import axios from "axios";
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/market`;

export const getList = async (pageParam, search, sort) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/list`, {params: { page: page, size: size, search: search, sort: sort }});
    return res.data;
};

export const getLatestMarket = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/latest`, { params: { page: page, size: size } });
    return res.data;
  } 