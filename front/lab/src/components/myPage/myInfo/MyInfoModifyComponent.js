import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { modifyUser, getUser } from '../../../api/userApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile_Img from '../../../resources/images/profile_img.png';
import { Link } from 'react-router-dom';
//import useCustomMove from '../../hooks/useCustomMove';
//import useCustomLogin from '../../hooks/useCustomLogin';
import PostComponent from '../../common/PostComponent';

const initState = {
  id: '',
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

const MyInfoModifyComponent = ({ id }) => {
  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보
  const navigate = useNavigate();

  //주소 찾기 팝업 추가
  const [address, setAddress] = useState('');
  const ino = loginInfo.id;

  useEffect(() => {
    getUser(ino).then((data) => {
      setUser(data);
      setAddress(data.addr);
      fetchUserProfileImage(data.email);
    });
  }, [ino]);

  // 상태변경 (입력값에 따라 상태값 변경)
  const handleChange = (e) => {
    user[e.target.name] = e.target.value;
    setUser({ ...user });
  };
  // const handleChange = (e) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // addr(팝업 검색주소)만 따로 상태변경
  const handleAddrChange = (newAddr) => {
    setAddress(newAddr);
    setUser({
      ...user,
      addr: newAddr,
    });
  };

  // 수정완료 버튼
  const handleClickModify = () => {
    modifyUser(user); // 사용자 정보 전달 (userApi.js에 있는 modifyUser 함수)
    alert('회원정보 수정 완료되었습니다');
    navigate('/myPage/info', { state: { ...user } });
  };

  // 사진 업로드
  const inputRef = useRef(null);
  const handleFileClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
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
    <div>
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
            <div className="relative mb-4 w-full items-stretch">
              <div className="w-44">
                <PostComponent setAddress={handleAddrChange}></PostComponent>
              </div>
              <input
                className="w-full p-3 rounded-r border border-solid border-neutral-300 shadow-md"
                name="addr"
                type={'text'}
                placeholder="주소(우편번호 및 도로명 검색)"
                value={address}
                readOnly // 추가
              />
              {/* 오류수정 : // onChange={handleChange} */}

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
