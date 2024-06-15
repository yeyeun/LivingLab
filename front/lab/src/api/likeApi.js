import axios from 'axios';
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/like`;

export const likeBuy = async(likeBuy) => {
    const res = await axios.post(`${prefix}/buy`,likeBuy);
    return res.data;
};

export const unlikeBuy = async(likeNo) => {
    const res = await axios.delete(`${prefix}/buy/${likeNo}`);
    return res.data;
};