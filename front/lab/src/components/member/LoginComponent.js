import React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginPostAsync } from '../../slices/loginSlice';
import imgLogo2 from '../../resources/images/logo2.png';
import HorizonLine from '../../utils/HorizontalLine';

const initState = {
  email: '',
  pwd: '',
};

function LoginComponent(props) {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;

    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (e) => {
    dispatch(login(loginParam));

    //dispatch(loginPostAsync(loginParam));
  };

  return (
    <div className="max-h-400">
      <div className="flex justify-center">
        <div className="text-4xl m-1 p-1 font-extrabold text-blue-500">
          <img
            src={imgLogo2}
            alt="imgLogo2"
            class="object-contain h-48 w-96 ..."
          />
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
              name="pw"
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
              <button
                className="rounded p-2 w-full bg-black text-xl text-white"
                onClick={handleClickLogin}
              >
                로그인
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-blue-500 text-xl text-white">
                회원가입
              </button>
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
              <button className="rounded p-2 w-full bg-gray-300 text-xl text-white">
                Google
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-yellow-300 text-xl text-white">
                KAKAO
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-green-400 text-xl text-white">
                Naver
              </button>
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
