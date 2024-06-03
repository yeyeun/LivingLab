import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_SERVER_HOST, getUser } from '../../api/userApi';

import { useLocation, Link } from 'react-router-dom';

const initState = {
  id: 0,
  email: '',
  name: '',
  phone: '',
  nickname: '',
  pwd: '',
  pwdCheck: '',
  addr: '',
};
const host = API_SERVER_HOST;

const MyInfoComponent = ({ id }) => {
  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보

  useEffect(() => {
    setUser({ ...loginInfo });
  }, [loginInfo]); // loginInfo가 변경되면 useEffect 사용해서 영향을 준다.

  // useEffect(() => {
  //   getUser(id).then((data) => {
  //     console.log(data);
  //     setUser(data);
  //   });
  // }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <div className="flex justify-center">
            <div className="w-full p-3 my-3 text-left font-bold text-2xl text-emerald-400">회원정보 조회</div>

            <Link to={'/myPage/info/modify'}>
              <button type="button" className="rounded p-1 mt-8 text-m w-32 text-white bg-blue-500">
                수정하기
              </button>
            </Link>
          </div>

          <div className="border-2 border-sky-200 p-4  bg-gray-50">
            <div className="flex justify-center">
              <div className="w-1/3 p-3 text-left font-bold">아이디</div>
              <div className="relative mb-4 flex w-full items-stretch">
                <input className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md" name="email" type={'text'} value={user.email} readOnly></input>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1/3 p-3 text-left font-bold">이름</div>
              <div className="relative mb-4 flex w-full items-stretch">
                <input
                  className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="name"
                  type={'text'}
                  value={user.name}
                  placeholder="이름"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1/3 p-3 text-left font-bold">휴대폰 번호</div>
              <div className="relative mb-4 flex w-full items-stretch">
                <input
                  className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="phone"
                  type={'text'}
                  value={user.phone}
                  placeholder="전화번호"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1/3 p-3 text-left font-bold">닉네임</div>
              <div className="relative mb-4 flex w-full items-stretch">
                <input
                  className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="nickname"
                  type={'text'}
                  value={user.nickname}
                  placeholder="닉네임"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1/3 p-3 text-left font-bold">비밀번호</div>
              <div className="relative mb-4 flex w-full items-stretch">
                <input
                  className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="pwd"
                  type={'password'}
                  value={user.pwd}
                  placeholder="비밀번호를 입력하세요"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1/3 p-3 text-left font-bold">비밀번호 확인</div>
              <div className="relative mb-4 flex w-full items-stretch">
                <input
                  className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="pwd"
                  type={'password'}
                  value={user.pwd}
                  placeholder="비밀번호 확인"
                  readOnly
                ></input>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-1/3 p-3 text-left font-bold">주소</div>
              <div className="relative mb-4 flex flex-wrap w-full items-stretch">
                <input
                  className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="addr"
                  type={'text'}
                  placeholder="주소(클릭시 주소검색창 열림)"
                  value={user.addr}
                  readOnly
                ></input>

                <input
                  className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                  name="addr"
                  type={'text'}
                  placeholder="상세주소"
                  value={user.addr}
                  readOnly
                ></input>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>수정된 데이터가 넘어오지 않았음</div>
      )}
    </div>
  );
};
export default MyInfoComponent;
