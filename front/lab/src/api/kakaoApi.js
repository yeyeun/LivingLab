// <REST API를 사용한 카카오 로그인 과정>
// [1. 인가 코드 받기]
// 1) 서비스 서버가 카카오 인증 서버로 인가 코드 받기를 요청합니다.
// 2) 카카오 인증 서버가 사용자에게 카카오계정 로그인을 통한 인증을 요청합니다.
// - 클라이언트에 유효한 카카오계정 세션이 있거나, 카카오톡 인앱 브라우저에서의 요청인 경우 4단계로 넘어갑니다.
// 3) 사용자가 카카오계정으로 로그인합니다.
// 4) 카카오 인증 서버가 사용자에게 동의 화면을 출력하여 인가를 위한 사용자 동의를 요청합니다.
// - 동의 화면은 서비스 애플리케이션(이하 앱)의 동의항목 설정에 따라 구성됩니다.
// 5) 사용자가 필수 동의항목, 이 외 원하는 동의항목에 동의한 뒤 [동의하고 계속하기] 버튼을 누릅니다.
// 6)카카오 인증 서버는 서비스 서버의 Redirect URI로 인가 코드를 전달합니다.

// [2. 토큰 받기 (1에서 전달받은 인가 코드로 토큰 발급을 요청)]
// 1) 서비스 서버가 Redirect URI로 전달받은 인가 코드로 토큰 받기를 요청합니다.
// 2) 카카오 인증 서버가 토큰을 발급해 서비스 서버에 전달합니다.

import axios from 'axios';
import { API_SERVER_HOST } from './userApi';

const rest_api_key = '2b0436fd31d228c6702bb085c415ef9e'; // 이메일 나오는 rest api 키 받음

const redirect_uri = 'http://localhost:3000/user/kakao'; //카카오 로그인에서 사용할 OAuth Redirect URI를 설정

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'; // 인가 코드 받는 경로

const access_token_url = 'https://kauth.kakao.com/oauth/token'; // 토큰 받는 경로

// 1. 인가 코드 받기를 요청 (GET)
// - 사용자가 서비스에서 카카오 로그인 버튼 클릭 시,
// - 카카오 인증 서버로 인가코드(code) 발급 요청
// redirect_uri에 GET 요청으로 전달
// 카카오 인증 서버는 인가코드를 발급해 서비스 서버의 Redirect URI로 인가 코드를 전달
///////////////////////////////////////////////////////////////////////////////////////
// 기존 로그인 여부와 상관없이 로그인 하기(맨뒤에 prompt=login을 추가)
// 이 기능을 사용하면 사용자가 브라우저에 카카오 계정으로 로그인되어 있는 상태라도
// 다시 카카오 계정으로 로그인하는 과정을 거쳐 서비스에 카카오 로그인하도록 할 수 있다.
// 인가 코드 받기 요청시 prompt 파리미터 값을 login으로 지정
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;
  //const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

// 2. 인가 코드로 토큰 발급을 요청 (POST)
// - 서비스는 전달받은 인가 코드로 토큰을 요청하여 Access Token과 Refresh 토큰을 발급받는다.
// 인가 코드 받기만으로는 카카오 로그인이 완료되지 않는다.
// 토큰 받기까지 마쳐야 카카오 로그인을 정상적으로 완료할 수 있다.
export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };

  const params = {
    grant_type: 'authorization_code',
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  // 필수 파라미터(params)를 포함해 POST로 요청
  const res = await axios.post(access_token_url, params, header);

  // 요청 성공시, 응답은 토큰(accessToken)과 토큰 정보를 포함한다.
  const accessToken = res.data.access_token;

  return accessToken; // 토큰 발급
};

// 리액트에서 api 서버 호출
export const getUserWithAccessToken = async (accessToken) => {
  const res = await axios.get(`${API_SERVER_HOST}/api/user/kakao?accessToken=${accessToken}`);

  return res.data;
};
