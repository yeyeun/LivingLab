import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
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
  files: [], // files 초기값 추가
};

function JoinComponent(props) {
  const [joinParam, setJoinParam] = useState({ ...initState });

  //주소 찾기 팝업 추가
  const [address, setAddress] = React.useState('');
  const [popup, setPopup] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 사용

  const handleChange = (e) => {
    joinParam[e.target.name] = e.target.value;

    setJoinParam({ ...joinParam });
  };

  // addr(팝업 검색주소)만 따로 상태변경
  const handleAddrChange = (newAddr) => {
    setAddress(newAddr);
    setJoinParam({
      ...joinParam,
      addr: newAddr,
    });
  };

  const handleFileChange = (e) => {
    setJoinParam({
      ...joinParam,
      files: e.target.files,
    });
  };

  const handleClickJoin = async (e) => {
    e.preventDefault();

    if (joinParam.pwd !== joinParam.confirmPwd) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await joinUser(joinParam); // joinUser API 호출
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
              className="w-3/4 p-3 rounded-r border border-solid border-neutral-500 shadow-md"
              name="email"
              type={'text'}
              placeholder="MLP1234@gmail.com"
              value={joinParam.email}
              onChange={handleChange}
            ></input>
            <button className="rounded p-2 w-1/4 bg-gray-500 text-xm text-white" onClick={handleClickJoin}>
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
              name="confirmPwd"
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
              name="phone"
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
              name="nickname"
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
            <div className="w-44">
              <PostComponent setAddress={handleAddrChange}></PostComponent>
            </div>
            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
              name="addr"
              type={'text'}
              placeholder="주소(우편번호 및 도로명 검색)"
              value={joinParam.addr}
              readOnly
            />

            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
              name="detailAddr"
              type={'text'}
              placeholder="상세주소"
              value={joinParam.detailAddr}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">프로필 이미지</div>
            <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" name="files" type="file" multiple onChange={handleFileChange} />
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
