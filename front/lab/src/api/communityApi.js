import axios from "axios";
export const API_SERVER_HOST = 'http://localhost:8282';
const prefix = `${API_SERVER_HOST}/api/community`;

// ******자취 TIP 게시판******
export const postAddTip = async(tip) => {
    const header = {headers:{"Content-Type":"multipart/form-data"}};
    const res = await axios.post(`${prefix}/tip/add`, tip, header);
    return res.data;
}

export const getListTip = async(pageParam, search) => {
    const {page, size} = pageParam
    const res =await axios.get(`${prefix}/tip/list`, {params:{page:page, size:size, search: search}})
    return res.data
}

export const getOneTip = async(commNo) => {
    const res = await axios.get(`${prefix}/tip/read/${commNo}`);
    return res.data;
}

export const modifyTip = async(commNo, tip) => {
    const header = {headers:{"Content-Type":"multipart/form-data"}};
    const res = await axios.post(`${prefix}/tip/add/${commNo}`, tip, header);
    return res.data;
}

// ******질문 게시판******
export const postAddQna = async(tip) => {
    const header = {headers:{"Content-Type":"multipart/form-data"}};
    const res = await axios.post(`${prefix}/qna/add`, tip, header);
    return res.data;
}

export const getListQna = async(pageParam) => {
    const {page, size} = pageParam
    const res =await axios.get(`${prefix}/qna/list`, {params:{page:page, size:size}})
    return res.data
}

export const getOneQna = async(commNo) => {
    const res = await axios.get(`${prefix}/qna/read/${commNo}`);
    return res.data;
}

// ******리뷰 게시판******
export const postAddReview = async(tip) => {
    const header = {headers:{"Content-Type":"multipart/form-data"}};
    const res = await axios.post(`${prefix}/review/add`, tip, header);
    return res.data;
}

export const getListReview = async(pageParam) => {
    const {page, size} = pageParam
    const res =await axios.get(`${prefix}/review/list`, {params:{page:page, size:size}})
    return res.data
}

export const getOneReview = async(commNo) => {
    const res = await axios.get(`${prefix}/review/read/${commNo}`);
    return res.data;
}

// ******도움요청 게시판******
export const postAddHelp = async(tip) => {
    const header = {headers:{"Content-Type":"multipart/form-data"}};
    const res = await axios.post(`${prefix}/help/add`, tip, header);
    return res.data;
}

export const getListHelp = async(pageParam) => {
    const {page, size} = pageParam
    const res =await axios.get(`${prefix}/help/list`, {params:{page:page, size:size}})
    return res.data
}

export const getOneHelp = async(commNo) => {
    const res = await axios.get(`${prefix}/help/read/${commNo}`);
    return res.data;
}