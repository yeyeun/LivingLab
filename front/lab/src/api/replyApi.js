import axios from 'axios';
export const API_SERVER_HOST = 'http://223.130.157.92:22222';
const prefix = `${API_SERVER_HOST}/api/reply`;

export const addReply = async(reply) => {
  const res = await axios.post(`${prefix}/add`, reply);
  return res.data;
}

export const deleteReply = async(replyNo) => {
  const res = await axios.delete(`${prefix}/${replyNo}`);
  return res.data;
}

export const getList = async (commNo) => {
  const res = await axios.get(`${prefix}/${commNo}`);
  return res.data;
};

export const modifyReply = async(replyNo, editedContent) => {
  const res = await axios.put(`${prefix}/${replyNo}`, {
    content : editedContent
  });
  return res.data;
}