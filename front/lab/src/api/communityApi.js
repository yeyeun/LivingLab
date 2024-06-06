import axios from "axios";
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/community`;

// ******자취 TIP 게시판******
export const postAddTip = async(tip) => {
    const header = {headers:{"Content-Type":"multipart/form-data"}};
    const res = await axios.post(`${prefix}/tip/add`, tip, header);
    return res.data;
}

export const getListTip = async(pageParam) => {
    const {page, size} = pageParam
    const res =await axios.get(`${prefix}/tip/list`, {params:{page:page, size:size}})
    return res.data
}

export const getOneTip = async(commNo) => {
    const res = await axios.get(`${prefix}/tip/read/${commNo}`);
    return res.data;
}