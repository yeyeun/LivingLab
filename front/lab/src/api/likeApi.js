import axios from 'axios';
const prefix = `/api/like`;


export const likeClick = async(type, no, id) => {
    const res = await axios.post(`${prefix}/likeClick`,{
            type: type,
            no: no,
            id: id
    });
    return res.data;
};

export const unlikeClick = async(likeNo) => {
    const res = await axios.delete(`${prefix}/unlikeClick/${likeNo}`);
    return res.data;
};

export const likeInfo = async(type, no, id) => {
    const res = await axios.get(`${prefix}/likeInfo`,{
        params : {
            type: type,
            no: no,
            id: id
        }
    });
    return res.data;
};

export const myLike = async (pageParam, id) => {
    const { page, size } = pageParam;
    const res = await axios.get(`${prefix}/mylike`, { params: { page: page, size: size, id: id} });
    return res.data;
  };