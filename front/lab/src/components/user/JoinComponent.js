import React from 'react';
import axios from 'axios';
import { useState, useRef } from 'react';
import imgLogo2 from '../../resources/images/logo2.png';
import PostComponent from '../common/PostComponent';
import { joinUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import Profile_Img from '../../resources/images/profile_img.png';

const initState = {
  email: '',
  pwd: '',
  confirmPwd: '',
  phone: '',
  name: '',
  nickname: '',
  addr: '',
  detailAddr: '',
  file: [], // file 초기값 추가
};

function JoinComponent(props) {
  const [user, setUser] = useState({ ...initState });
  const [address, setAddress] = React.useState(''); //주소 찾기 팝업 추가

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

  // 가입하기 버튼
  const handleClickJoin = async (e) => {
    e.preventDefault();

    if (user.pwd !== user.confirmPwd) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const files = imgRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

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

  // 사진 업로드
  const inputRef = useRef(null);
  const handleFileClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    setUser({
      ...user,
      file: e.target.files[0],
    });

    const file = e.target.files[0]; // 첫번째 파일만 선택
    if (file) {
      uploadFile(file); // 파일을 서버에 업로드
    }
    alert('프로필 이미지를 변경했습니다.');
  };

  // 파일을 서버에 전송하는 함수
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('id', user.id);
      formData.append('file', file); // 파일을 FormData에 추가
      console.log('유저 이미지 교체 중');
      const res = await axios.post('http://localhost:8282/api/user/modify/updateImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('유저 프로필 교체 성공', res.data);
      fetchUserProfileImage(user.email); // 이미지 바꾸면 다시 리로딩 (필수)
    } catch (error) {
      console.log('Error uploading file', error);
    }
  };

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
        ...prev, // 이전 상태를 복사해야 이미지 삭제하고 다시 변경했을 때 바로 적용됨
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

  //프로필 삭제 메서드
  const handleFileDelete = async () => {
    try {
      await axios.put('http://localhost:8282/api/user/modify/userProfileImageDelete', {
        email: user.email,
      });
      alert('프로필 이미지를 삭제했습니다');
      console.log('이미지 삭제 성공');
      fetchUserProfileImage(user.email);
      // 받은 바이너리 데이터 처리
    } catch (error) {
      console.error('이미지 삭제 오류', error);
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
          <div className="w-1/3 p-3 text-left font-bold">프로필 사진</div>
          <div className="relative mb-4 flex w-full items-stretch">
            <div className="mt-2">
              <img src={user.profileImage ? user.profileImage : Profile_Img} alt="프로필이미지" className="rounded-full size-40 mx-auto" />
              <div class="flex">
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
                <button
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-200 file:text-slate-700 hover:file:bg-violet-100"
                  onClick={handleFileClick}
                >
                  이미지 변경
                </button>
                <button
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-200 file:text-slate-700 hover:file:bg-violet-100"
                  onClick={handleFileDelete}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>

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

        {/* <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-full p-3 text-left font-bold">프로필 이미지</div>
            <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" ref={imgRef} type="file" multiple onChange={handleFileChange} />
          </div>
        </div> */}

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
