import React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginPostAsync } from '../../slices/loginSlice';
import imgLogo2 from '../../resources/images/logo2.png';

const initState = {
  email: '',
  pwd: '',
  confirmPwd: '',
  phone: '',
  nickname: '',
  addr: '',
  birth: '',
};

function JoinComponent(props) {
  const [joinParam, setJoinParam] = useState({ ...initState });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    joinParam[e.target.name] = e.target.value;

    setJoinParam({ ...joinParam });
  };

  const handleClickJoin = (e) => {
    dispatch(login(joinParam));

    //dispatch(loginPostAsync(loginParam));
  };

  return (
    <div className="max-h-400">
      <div className="flex justify-center">
        {/* <div className="text-4xl m-1 p-1 font-extrabold text-blue-500">
          <img
            src={imgLogo2}
            alt="imgLogo2"
            class="object-contain h-48 w-96 ..."
          />
        </div> */}
        <div className="w-full p-3 my-3 text-left font-bold text-2xl text-emerald-400">
          회원가입
        </div>
      </div>
      <div className="border-2 border-sky-200 p-4">
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">이메일</div>
            <input
              className="w-3/4 p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="email"
              type={'text'}
              placeholder="MLP1234@gmail.com"
              value={joinParam.email}
              onChange={handleChange}
            ></input>
            <button
              className="rounded p-2 w-1/4 bg-gray-500 text-xm text-white"
              onClick={handleClickJoin}
            >
              중복확인
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">비밀번호</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="pwd"
              type={'password'}
              placeholder="비밀번호를 입력하세요."
              value={joinParam.pwd}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">비밀번호 확인</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="pwd"
              type={'password'}
              placeholder="비밀번호 확인"
              value={joinParam.confirmPwd}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">이름</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="name"
              type={'text'}
              placeholder="이름"
              value={joinParam.name}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">휴대폰 번호</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="name"
              type={'text'}
              placeholder="전화번호"
              value={joinParam.phone}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">닉네임</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="name"
              type={'text'}
              placeholder="닉네임"
              value={joinParam.nickname}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">주소</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="name"
              type={'text'}
              placeholder="주소(클릭시 주소검색창 열림)"
              value={joinParam.addr}
              onChange={handleChange}
            ></input>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="name"
              type={'text'}
              placeholder="상세주소"
              value={joinParam.addr}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        {/* <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">생년월일</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="name"
              type={'text'}
              placeholder="생년월일"
              value={joinParam.birth}
              onChange={handleChange}
            ></input>
          </div>
        </div> */}

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button
                className="rounded p-2 w-1/2 bg-sky-500 text-xl text-white"
                onClick={handleClickJoin}
              >
                가입하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JoinComponent;
