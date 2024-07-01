import axios from 'axios';
export const API_SERVER_HOST = 'http://223.130.157.92:22222';
const prefix = `${API_SERVER_HOST}/api/like`;

/* ============공동구매============== */

export const likeBuy = async(likeBuy) => {
    const res = await axios.post(`${prefix}/buy`,likeBuy);
    return res.data;
};

export const unlikeBuy = async(likeNo) => {
    const res = await axios.delete(`${prefix}/buy/${likeNo}`);
    return res.data;
};

export const deleteLikeBuy = async (buyNo) => { // 해당 글에 찍힌 모든 좋아요 삭제
    const res = await axios.delete(`${prefix}/buy/all/${buyNo}`);
    console.log('deleting ', res.data);
    return res.data;
};

export const likeInfoBuy = async(buyNo, id) => {
    const res = await axios.get(`${prefix}/buy`,{
        params : {
            buyNo: buyNo,
            id: id
        }
    });
    return res.data;
};

/* ============동네모임============== */

export const likeTeam = async(likeTeam) => {
    const res = await axios.post(`${prefix}/team`,likeTeam);
    return res.data;
};

export const unlikeTeam = async(likeNo) => {
    const res = await axios.delete(`${prefix}/team/${likeNo}`);
    return res.data;
};

export const likeInfoTeam = async(teamNo, id) => {
    const res = await axios.get(`${prefix}/team`,{
        params : {
            teamNo: teamNo,
            id: id
        }
    });
    return res.data;
};

export const deleteLikeTeam = async (teamNo) => { // 해당 글에 찍힌 모든 좋아요 삭제
    const res = await axios.delete(`${prefix}/team/all/${teamNo}`);
    console.log('deleting ', res.data);
    return res.data;
};

/* ============동네장터============== */

export const likeMarket = async(likeMarket) => {
    const res = await axios.post(`${prefix}/market`,likeMarket);
    return res.data;
};

export const unlikeMarket = async(likeNo) => {
    const res = await axios.delete(`${prefix}/market/${likeNo}`);
    return res.data;
};

export const deleteLikeMarket = async (marketNo) => { // 해당 글에 찍힌 모든 좋아요 삭제
    const res = await axios.delete(`${prefix}/market/all/${marketNo}`);
    console.log('deleting ', res.data);
    return res.data;
};

export const likeInfoMarket = async(marketNo, id) => {
    const res = await axios.get(`${prefix}/market`,{
        params : {
            marketNo: marketNo,
            id: id
        }
    });
    return res.data;
};


/* ============자취방쉐어============== */

export const likeRoom = async(likeRoom) => {
    const res = await axios.post(`${prefix}/shareRoom`,likeRoom);
    return res.data;
};

export const unlikeRoom = async(likeNo) => { // 좋아요 단건 삭제
    const res = await axios.delete(`${prefix}/shareRoom/${likeNo}`);
    return res.data;
};

export const deleteLikeRoom = async (roomNo) => { // 해당 글에 찍힌 모든 좋아요 삭제
    const res = await axios.delete(`${prefix}/shareRoom/all/${roomNo}`);
    console.log('deleting ', res.data);
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

/* ============커뮤니티============== */

export const likeComm = async(likeComm) => {
    const res = await axios.post(`${prefix}/comm`,likeComm);
    return res.data;
};

export const unlikeComm = async(likeNo) => {
    const res = await axios.delete(`${prefix}/comm/${likeNo}`);
    return res.data;
};

export const likeInfoComm = async(commNo, id) => {
    const res = await axios.get(`${prefix}/comm`,{
        params : {
            commNo: commNo,
            id: id
        }
    });
    return res.data;
};