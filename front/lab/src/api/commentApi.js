import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/comment`;

export const addComment = async(comment) => {
  const header = {headers:{"Content-Type":"multipart/form-data"}};
  const res = await axios.post(`${prefix}/add`, comment, header);
  return res.data;
}
