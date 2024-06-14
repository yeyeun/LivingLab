import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginPostAsync } from '../../slices/loginSlice';
import imgLogo2 from '../../resources/images/logo2.png';
import HorizonLine from '../../util/HorizontalLine';
import KakaoLoginComponent from './KakaoLoginComponent';
import { getKakaoLoginLink } from '../../api/kakaoApi';
import useCustomLogin from '../../hooks/useCustomLogin';
import { loginPost } from '../../api/userApi';

const initState = {
  email: '',
  pwd: '',
};

function LoginComponent(props) {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { moveToLogin, moveToPath } = useCustomLogin();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    loginPost(loginParam).then((userInfo) => {
      console.log('----------------------------');
      console.log(userInfo);
      dispatch(login(userInfo));

      // 로그인 후 메인으로
      if (userInfo.email != null) {
        //성공
        alert('로그인 되었습니다.');
        moveToPath('/');
      } else {
        alert('이메일 혹은 비밀번호를 다시 한번 확인해주세요');
        moveToLogin(); // 실패
      }
    });
  };

  return (
    <div className="max-h-400">
      <div className="flex justify-center">
        <div className="text-4xl m-1 p-1 font-extrabold text-blue-500">
          <img src={imgLogo2} alt="imgLogo2" className="object-contain h-48 w-96 ..." />
        </div>
      </div>
      <div className="border-2 border-sky-200 p-4">
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">Email</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="email"
              type={'text'}
              placeholder="이메일"
              value={loginParam.email}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">Password</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="pwd"
              type={'password'}
              placeholder="비밀번호"
              value={loginParam.pwd}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-black text-xl text-white" onClick={handleClickLogin}>
                로그인
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-blue-500 text-xl text-white">회원가입</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold text-gray-500">
              <HorizonLine text="SNS 간편 로그인 / 회원가입" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-gray-300 text-xl text-white">Google</button>
            </div>
          </div>
        </div>

        <KakaoLoginComponent />

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-green-400 text-xl text-white">Naver</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold text-gray-500">
              <HorizonLine text="아이디/비밀번호 찾기" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginComponent;
