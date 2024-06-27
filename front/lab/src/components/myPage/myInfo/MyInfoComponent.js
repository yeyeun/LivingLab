import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../api/userApi';
import { Link } from 'react-router-dom';
import Profile_Img from '../../../resources/images/profile_img.png';

const initState = {
  id: 0,
  email: '',
  name: '',
  phone: '',
  nickname: '',
  pwd: '',
  pwdCheck: '',
  addr: '',
  detailAddr: '',
  profileImage: '',
};

const MyInfoComponent = () => {
  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보
  const ino = loginInfo.id;

  console.log(ino);

  useEffect(() => {
    getUser(ino).then((data) => {
      fetchUserProfileImage(data.email);
      setUser(data);
    });
  }, [ino]);

  //프로필 사진 읽어오는 함수
  const fetchUserProfileImage = async (email) => {
    try {
      const res = await axios.get(`http://localhost:8282/api/user/userProfileImage?email=${email}`, {
        responseType: 'arraybuffer', // 바이너리 데이터로 응답받기
      });

      // 받은 바이너리 데이터 처리
      const blob = new Blob([res.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      setUser((prev) => ({
        ...prev, // 이전 상태를 복사해야 이미지 삭제하고 다시 변경했을 대 바로 적용됨
        profileImage: imageUrl, // 이미지 데이터 추가
      }));
      console.log('프로필 사진 읽기 최종 성공');
    } catch (error) {
      console.error('프로필 이미지가 없습니다', error);
      // 오류가 발생하면 대체 이미지를 사용하도록 설정
      setUser((prev) => ({
        ...prev,
        profileImage: Profile_Img,
      }));
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full p-3 my-3 text-left font-bold text-2xl text-emerald-400">회원정보 조회</div>

        <Link to={'/myPage/info/modify'}>
          <button type="button" className="rounded p-1 mt-8 text-m w-32 text-white bg-blue-500">
            수정하기
          </button>
        </Link>
      </div>

      <div className="p-4 bg-gray-50">
        <div className="flex justify-center">
          <div className="w-1/3 p-3 text-left font-bold">프로필 사진</div>
          <div className="relative mb-4 flex w-full items-stretch">
            <img src={user.profileImage ? user.profileImage : Profile_Img} alt="프로필이미지" className="rounded-full size-40 mx-auto" />
          </div>
        </div>
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
              placeholder="주소"
              value={user.addr}
              readOnly
            ></input>

            <input
              className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
              name="detailAddr"
              type={'text'}
              placeholder="상세주소"
              value={user.detailAddr}
              readOnly
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyInfoComponent;
