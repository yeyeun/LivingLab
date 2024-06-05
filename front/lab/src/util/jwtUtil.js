import axios from 'axios';
import { getCookie, setCookie } from './cookieUtil';
import { API_SERVER_HOST } from '../api/todoApi';

// 액세스 토큰을 써야될 때 jwtAxios.post/get
// 그게 아닌 경우 axios.post/get (userApi.js)
const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;

  const header = { headers: { Authorization: `Bearer ${accessToken}` } };

  const res = await axios.get(
    `${host}/api/user/refresh?refreshToken=${refreshToken}`,
    header
  );

  console.log(res.data); // 새로 만들어진 Access Token과 Refresh Token 출력

  return res.data;
};

//before request
const beforeReq = (config) => {
  console.log('before request.............');

  const userInfo = getCookie('user');

  if (!userInfo) {
    console.log('User NOT FOUND');
    return Promise.reject({ response: { data: { error: 'REQUIRE_LOGIN' } } });
  }

  const { accessToken } = userInfo;

  // Authorization 헤더처리
  // Access Token을 API 서버 호출 전에 Authorization 헤더를 추가하도록 구성
  console.log('-------------' + accessToken);
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

//fail request
const requestFail = (err) => {
  console.log('request error............');
  return Promise.reject(err);
};

//before return response
const beforeRes = async (res) => {
  console.log('before return response...........');

  // Access Token, Refresh Token을 이용해서 '/api/user/refresh'를 호출
  const data = res.data;

  if (data && data.error === 'ERROR_ACCESS_TOKEN') {
    const userCookieValue = getCookie('user');

    const result = await refreshJWT(
      userCookieValue.accessToken,
      userCookieValue.refreshToken
    );
    console.log('refreshJWT RESULT(결과값) : ' + result);

    // 갱신된 토큰의 저장과 재호출
    // 새로운 accessToken과 refreshToken
    // 이 값이 쿠키의 값이 되야되고, 쿠키 자체도 갱신되어야한다.
    userCookieValue.accessToken = result.accessToken;
    userCookieValue.refreshToken = result.refreshToken;

    setCookie('user', JSON.stringify(userCookieValue), 1);

    // 원래의 호출
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }

  return res;
};

//fail response
const responseFail = (err) => {
  console.log('response fail error.............');
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
