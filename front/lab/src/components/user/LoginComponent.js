import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login  } from '../../slices/loginSlice';
import imgLogo2 from '../../resources/images/logo2.png';
import HorizonLine from '../../util/HorizontalLine';
import KakaoLoginComponent from './KakaoLoginComponent';
import useCustomLogin from '../../hooks/useCustomLogin';
import { loginPost } from '../../api/userApi';
import FindIdModal from './FindIdModal';
import FindPwdModal from './FindPwdModal';

const initState = {
  email: '',
  pwd: '',
};

function LoginComponent(props) {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { moveToLogin, moveToPath, moveToJoin } = useCustomLogin();
  const [findIdModal, setFindIdModal] = useState(false);
  const [findPwdModal, setFindPwdModal] = useState(false);
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

  const handleModalClose = () => {
    setFindIdModal(false);
    setFindPwdModal(false);
  };

  const handleClickFindId = (e) => {
    setFindIdModal(true);
  };

  const handleClickFindPwd = (e) => {
    setFindPwdModal(true);
  };

  return (
    <div className="max-h-400">
      <div className="flex justify-center">
        <div className="text-4xl m-1 p-1 font-extrabold">
          <img src={imgLogo2} alt="imgLogo2" className="object-contain h-48 w-96 ..." />
        </div>
      </div>
      <div className="border border-slate-300 p-4 shadow-md">
        <div className="flex justify-center">
          <div className="relative flex w-full flex-wrap items-stretch">
            <div className="w-full py-3 text-left font-bold">이메일</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="email"
              type={'text'}
              placeholder="이메일을 입력해주세요"
              value={loginParam.email}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-10 flex w-full flex-wrap items-stretch">
            <div className="w-full py-3 text-left font-bold">비밀번호</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="pwd"
              type={'password'}
              placeholder="비밀번호를 입력해주세요"
              value={loginParam.pwd}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-slate-700 text-xl text-white hover:bg-black transition-colors"
              onClick={handleClickLogin}>
                로그인
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-2 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-mainColor hover:bg-teal-600 text-xl text-white transition-colors"
              onClick={() => moveToJoin()}>
                회원가입
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-10 flex w-full justify-center">
            <div className="text-sm flex justify-center font-bold text-gray-500 hover:text-black cursor-pointer" onClick={handleClickFindId}>
              아이디 찾기
            </div>
            <span className="text-sm font-bold text-gray-500 mx-3">|</span>
            <div className="text-sm flex justify-center font-bold text-gray-500 hover:text-black cursor-pointer" onClick={handleClickFindPwd}>
              비밀번호 찾기
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative flex w-full justify-center">
            <div className="w-full flex justify-center font-bold text-gray-500">
              <HorizonLine text="카카오 간편 로그인" />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-gray-300 text-xl text-white">Google</button>
            </div>
          </div>
        </div> */}

        <KakaoLoginComponent />

        {/* <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-full bg-green-400 text-xl text-white">Naver</button>
            </div>
          </div>
        </div> */}


      <FindIdModal title={'아이디 찾기'} isVisible={findIdModal} callbackFn={handleModalClose}/>
      <FindPwdModal title={'비밀번호 찾기'} isVisible={findPwdModal} callbackFn={handleModalClose} />
      </div>
    </div>
  );
}
export default LoginComponent;
