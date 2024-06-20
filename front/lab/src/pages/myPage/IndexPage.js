import axios from 'axios';
import { useSelector } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import { getUser } from '../../api/userApi';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import Profile_Img from '../../resources/images/profile_img.png';

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

const IndexPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보

  const ino = loginInfo.id;

  const getTextClass = (path) => {
    return location.pathname.startsWith(path) ? 'header-active' : 'text-gray-500';
  };

  //useCallback 훅을 사용할 때는 두 번째 인자로 의존성 배열을 전달해야함
  const handleClickActivity = useCallback(() => {
    navigate({ pathname: 'activity' });
  }, [navigate]);
  const handleClickChat = useCallback(() => {
    navigate({ pathname: 'chat' });
  }, [navigate]);
  const handleClickInfo = useCallback(() => {
    navigate({ pathname: 'info' });
  }, [navigate]);

  useEffect(() => {
    getUser(ino).then((data) => {
      fetchUserProfileImage(data.email);
      setUser(data);
      //setProfileImage(data.profileImage);
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
      <BasicLayout>
        <div className="text-xl flex-grow bg-teal-50">
          <div className="min-h-screen flex flex-row w-3/5 mx-auto my-10">
            <div className="flex flex-col w-80 bg-white overflow-hidden h-fit rounded-3xl mr-5 shadow-md">
              <ul className="flex flex-col py-4 my-8">
                <img src={user.profileImage ? user.profileImage : Profile_Img} alt="프로필이미지" className="rounded-full size-1/2 mx-auto" />

                <li>
                  <div className="flex items-center pt-3 pb-10 text-gray-900 rounded-lg dark:text-white">
                    <span className="flex-1 whitespace-nowrap text-center font-bold">{user.nickname}님</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex flex-row items-center h-24 group transform hover:translate-x-2 hover:cursor-pointer transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                    onClick={handleClickActivity}
                  >
                    <span className={`text-xl font-semibold ml-24 ${getTextClass('/myPage/activity')}`}>나의 활동</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex flex-row items-center h-24 transform hover:translate-x-2 hover:cursor-pointer transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                    onClick={handleClickChat}
                  >
                    <span className={`text-xl font-semibold ml-24 ${getTextClass('/myPage/chat')}`}>채팅</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex flex-row items-center h-24 transform hover:translate-x-2 hover:cursor-pointer transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                    onClick={handleClickInfo}
                  >
                    <span className={`text-xl font-semibold ml-24 ${getTextClass('/myPage/info')}`}>회원정보</span>
                  </div>
                </li>
              </ul>
            </div>
            <Outlet />
          </div>
        </div>
      </BasicLayout>
    </div>
  );
};

export default IndexPage;
