import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../api/userApi';
import { Link } from 'react-router-dom';

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

const MyActivityComponent = (props) => {
  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보

  const ino = loginInfo.id;

  useEffect(() => {
    getUser(ino).then((data) => {
      console.log(data);
      setUser(data);
    });
  }, [ino]);

  return (
    <div>
      <div className="mt-3 p-4  bg-gray-50">
        <div className="flex flex-nowrap">
          <div className="mx-auto">
            <Link to={'/buy'} className="main-headline">
              <div className="mb-3">공동구매</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
          <div className="mx-auto">
            <Link to={'/team'} className="main-headline">
              <div className="mb-3">동네모임</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
        </div>

        <div className="flex flex-nowrap">
          <div className="mx-auto">
            <Link to={'/market'} className="main-headline">
              <div className="mb-3">동네장터</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
          <div className="mx-auto">
            <Link to={'/shareRoom'} className="main-headline">
              <div className="mb-3">자취방쉐어</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
        </div>

        <div className="flex flex-nowrap">
          <div className="mx-auto">
            <Link to={'/community'} className="main-headline">
              <div className="mb-3">커뮤니티</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
          <div className="mx-auto">
            <Link to={'/comment'} className="main-headline">
              <div className="mb-3">댓글 모음</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
        </div>

        <div className="flex flex-nowrap">
          <div className="mx-auto">
            <Link to={'/like'} className="main-headline">
              <div className="mb-3">좋아요 모음</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
          <div className="mx-auto">
            <Link to={'/bookmark'} className="main-headline">
              <div className="mb-3">즐겨찾기 모음</div>
              <div className="myPage-box"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyActivityComponent;
