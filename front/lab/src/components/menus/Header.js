import React from 'react';
import axios from 'axios';
import { getUser, fetchUserProfileImage } from '../../api/userApi';
import Profile_Img from '../../resources/images/profile_img.png';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../resources/images/logo1.png';
import { logout } from '../../slices/loginSlice';
import { useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import useCustomLogin from '../../hooks/useCustomLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faComments, faMessage, faHouse, faFilePen, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  // 아래 한 줄 코드 userSelector로 어디서든간에 로그인 데이터가 바뀌는 걸 알 수 있다.
  // 이게 리덕스 툴킷이 하는 일
  const loginState = useSelector((state) => state.loginSlice);

  const { doLogout, moveToPath } = useCustomLogin();

  //const dispatch = useDispatch();

  const handleClickLogout = () => {
    //dispatch(logout());

    doLogout();
    alert('로그아웃되었습니다.');
    moveToPath('/');
  };

  const location = useLocation();

  const getLinkClass = (path) => {
    if (path === '/') {
      //홈의 경우
      return location.pathname === path ? 'header-active' : 'menu-hover color-wood';
    }
    // 그 외의 경우
    return location.pathname.startsWith(path) && location.pathname !== '/' ? 'header-active' : 'menu-hover color-wood';
  };

  return (
    <nav id="navbar" className="z-50 bg-white flex-wrap relative flex w-full items-center justify-start py-3 border-b-2">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        {/* left section */}
        <div className="flex items-center basis-auto text-xl  ">
          <img src={Logo} alt="LOGO" className="w-60" />
          <ul className="flex flex-row p-3 list-none me-auto">
            <li className="pr-10 pl-5">
              <Link to={'/'} className={getLinkClass('/')}>
                홈
              </Link>
            </li>
            <li className="pr-10">
              <Link to={'/buy'} className={getLinkClass('/buy')}>
                공동구매
              </Link>
            </li>
            <li className="pr-10">
              <Link to={'/team'} className={getLinkClass('/team')}>
                동네모임
              </Link>
            </li>
            <li className="pr-10">
              <Link to={'/market'} className={getLinkClass('/market')}>
                동네장터
              </Link>
            </li>
            <li className="pr-10">
              <Link to={'/shareRoom'} className={getLinkClass('/shareRoom')}>
                자취방쉐어
              </Link>
            </li>
            <li className="pr-10">
              <Link to={'/community'} className={getLinkClass('/community')}>
                커뮤니티
              </Link>
            </li>
          </ul>
        </div>
        {/* right section */}
        <div className="relative flex items-center">
          {!loginState.nickname ? (
            // 비로그인 상태
            <div>
              <button
                type="button"
                className="border border-gray-700 bg-gray-700 text-white 
                        rounded-lg px-2 mx-1 transition duration-100 ease select-none hover:bg-gray-950 
                        focus:outline-none focus:shadow-outline"
              >
                <Link to={'/user/join'}>
                  <div className="flex items-center p-2 text-white rounded-lg">
                    <svg
                      className="flex-shrink-0 w-5 h-5 mr-2 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                      <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                      <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                    </svg>
                    회원가입
                  </div>
                </Link>
              </button>
              <button
                type="button"
                className="border border-gray-700 bg-gray-700 text-white 
                        rounded-lg px-2 mx-1 transition duration-300 ease select-none hover:bg-gray-950 
                        focus:outline-none focus:shadow-outline"
              >
                <Link to={'/user/login'}>
                  <div className="flex items-center p-2 text-white rounded-lg">
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">로그인</span>
                  </div>
                </Link>
              </button>
            </div>
          ) : (
            // 로그인 상태
            <div className="relative flex items-center">
              <button
                type="button"
                className="border border-gray-700 bg-gray-700 text-white 
                        rounded-lg px-2  mx-1 transition duration-100 ease select-none hover:bg-gray-950 
                        focus:outline-none focus:shadow-outline"
              >
                <Link to={'/myPage/activity'}>
                  <div className="flex items-center p-2 text-white rounded-lg">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="flex-shrink-0 w-5 h-5 mr-2 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    />
                    마이페이지
                  </div>
                </Link>
              </button>
              <button
                type="button"
                className="border border-gray-700 bg-gray-700 text-white 
                        rounded-lg px-2 mx-1 transition duration-300 ease select-none hover:bg-gray-950 
                        focus:outline-none focus:shadow-outline"
                onClick={handleClickLogout}
              >
                <div className="flex items-center p-2 text-white rounded-lg">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">로그아웃</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
