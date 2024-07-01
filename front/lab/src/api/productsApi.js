import axios from "axios";
export const API_SERVER_HOST = "http://223.130.157.92:22222";

const prefix = `${API_SERVER_HOST}/api/products`;

export const getOne = async (pno) => {
  const res = await axios.get(`${prefix}/${pno}`);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.post(`${prefix}/`, product, header);
  return res.data;
};

export const deleteOne = async (pno) => {
  const res = await axios.delete(`${prefix}/${pno}`);
  return res.data;
};

export const putOne = async (product) => {
  const res = await axios.put(`${prefix}/${product.pno}`, product);
  return res.data;
};
