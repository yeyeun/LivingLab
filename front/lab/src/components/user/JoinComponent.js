import React from 'react';
import { useState, useRef } from 'react';
import imgLogo2 from '../../resources/images/logo2.png';
import PostComponent from '../common/PostComponent';
import { joinUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const initState = {
  email: '',
  pwd: '',
  confirmPwd: '',
  phone: '',
  name: '',
  nickname: '',
  addr: '',
  detailAddr: '',
  file: null, // 파일 객체 초기값
};

function JoinComponent(props) {
  const [user, setUser] = useState({ ...initState });

  //주소 찾기 팝업 추가
  const [address, setAddress] = React.useState('');
  const [popup, setPopup] = React.useState(false);

  const imgRef = useRef();
  const navigate = useNavigate(); // useNavigate 사용

  const handleChange = (e) => {
    user[e.target.name] = e.target.value;

    setUser({ ...user });
  };

  // addr(팝업 검색주소)만 따로 상태변경
  const handleAddrChange = (newAddr) => {
    setAddress(newAddr);
    setUser({
      ...user,
      addr: newAddr,
    });
  };

  const handleFileChange = (e) => {
    setUser({
      ...user,
      file: e.target.files[0], //단일 파일
    });
  };

  const handleClickJoin = async (e) => {
    e.preventDefault();

    if (user.pwd !== user.confirmPwd) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', user.file);
    formData.append('email', user.email);
    formData.append('pwd', user.pwd);
    formData.append('confirmPwd', user.confirmPwd);
    formData.append('phone', user.phone);
    formData.append('name', user.name);
    formData.append('addr', user.addr);
    formData.append('nickname', user.nickname);
    formData.append('detailAddr', user.detailAddr);

    try {
      const response = await joinUser(formData); // joinUser API 호출
      if (response.result === true) {
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-h-400">
      <div className="flex justify-center">
        <div className="text-4xl m-1 p-1 font-extrabold text-blue-500">
          <img src={imgLogo2} alt="imgLogo2" class="object-contain h-48 w-96 ..." />
        </div>
      </div>
      <div className="border-2 border-sky-200 p-4">
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">이메일</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="email"
              type={'text'}
              placeholder="아이디는 이메일 형식으로 입력해주세요."
              value={user.email}
              onChange={handleChange}
            ></input>
            {/* <button className="rounded p-2 w-1/4 bg-gray-500 text-xm text-white" onClick={handleClickJoin}>
              중복확인
            </button> */}
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
              value={user.pwd}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">비밀번호 확인</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="confirmPwd"
              type={'password'}
              placeholder="비밀번호 확인"
              value={user.confirmPwd}
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
              value={user.name}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">휴대폰 번호</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="phone"
              type={'text'}
              placeholder="전화번호"
              value={user.phone}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">닉네임</div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="nickname"
              type={'text'}
              placeholder="닉네임"
              value={user.nickname}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">주소</div>
            <div className="w-44">
              <PostComponent setAddress={handleAddrChange}></PostComponent>
            </div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
              name="addr"
              type={'text'}
              placeholder="주소(우편번호 및 도로명 검색)"
              value={user.addr}
              readOnly
            />

            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
              name="detailAddr"
              type={'text'}
              placeholder="상세주소"
              value={user.detailAddr}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">프로필 이미지</div>
            <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" ref={imgRef} type="file" multiple onChange={handleFileChange} />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full justify-center">
            <div className="w-full flex justify-center font-bold">
              <button className="rounded p-2 w-1/2 bg-sky-500 text-xl text-white" onClick={handleClickJoin}>
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
