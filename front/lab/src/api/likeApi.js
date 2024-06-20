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

export const likeInfo = async(buyNo, id) => {
    const res = await axios.get(`${prefix}/buy`,{
        params : {
            buyNo: buyNo,
            id: id
        }
    });
    return res.data;
};

export const likeRoom = async(likeRoom) => {
    const res = await axios.post(`${prefix}/shareRoom`,likeRoom);
    return res.data;
};

export const unlikeRoom = async(likeNo) => {
    const res = await axios.delete(`${prefix}/shareRoom/${likeNo}`);
    return res.data;
};

export const likeInfoRoom = async(roomNo, id) => {
    const res = await axios.get(`${prefix}/shareRoom`,{
        params : {
            roomNo: roomNo,
            id: id
        }
    });
    return res.data;
};