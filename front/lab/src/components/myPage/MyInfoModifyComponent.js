import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { modifyUser, getUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useCustomMove from '../../hooks/useCustomMove';
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
  name: '',
  phone: '',
  nickname: '',
  pwd: '',
  pwdCheck: '',
  addr: '',
};

const MyInfoModifyComponent = ({ id }) => {
  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보
  const navigate = useNavigate();

  const ino = loginInfo.id;

  useEffect(() => {
    getUser(ino).then((data) => {
      console.log('계정의 id값 : ' + ino);
      console.log(data);
      setUser(data);
    });
  }, [ino]);

  // 상태변경 (입력값에 따라 상태값 변경)
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 수정완료 버튼
  const handleClickModify = () => {
    modifyUser(user); // 사용자 정보 전달 (userApi.js에 있는 modifyUser 함수)
    alert('회원정보 수정 완료되었습니다');
    navigate('/myPage/info');
  };

  return (
    <div>
      {/* 회원정보 수정 */}
      <div>
        <div className="flex justify-center">
          <div className="w-full p-3 my-3 text-left font-bold text-2xl text-emerald-400">회원정보 수정</div>
          <Link to={'/myPage/info'}>
            <button type="button" className="rounded p-1 mt-8 text-m w-32 text-white bg-blue-500">
              회원정보
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              ></input>
              <input
                className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                name="addr"
                type={'text'}
                placeholder="상세주소"
                value={user.addr}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative mb-1 flex w-full flex-wrap justify-end">
              <button type="button" className="rounded p-1 text-m w-32 text-white bg-blue-500" onClick={handleClickModify}>
                수정완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyInfoModifyComponent;
