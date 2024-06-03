import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../resources/images/logo1.png';
import { logout } from '../../slices/loginSlice';
import { useDispatch } from 'react-redux';
//import useCustomLogin from '../../hooks/useCustomLogin';

const Header = () => {
  // 아래 한 줄 코드 userSelector로 어디서든간에 로그인 데이터가 바뀌는 걸 알 수 있다.
  // 이게 리덕스 툴킷이 하는 일
  const loginState = useSelector((state) => state.loginSlice);

  //const { doLogout, moveToPath } = useCustomLogin();

  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logout());

    //doLogout();
    //alert('로그아웃되었습니다.');
    //moveToPath('/');
  };

  const location = useLocation();

  const getLinkClass = (path) => {
    if (path === '/') { //홈의 경우
      return location.pathname === path ? 'header-active' : 'menu-hover color-wood';
    }
    // 그 외의 경우
    return location.pathname.startsWith(path) && location.pathname !== '/' ? 'header-active' : 'menu-hover color-wood';
  };

  return (
    <nav
      id="navbar"
      className="bg-white flex-wrap relative flex w-full items-center justify-start py-3 border-b-2">
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
          {!loginState.email ? (
            <button
              type="button"
              className="border border-gray-700 bg-gray-700 text-white 
                        rounded-lg px-2 py-1 mx-1 transition duration-300 ease select-none hover:bg-gray-950 
                        focus:outline-none focus:shadow-outline"
            >
              <Link to={'/user/login'}>로그인</Link>
            </button>
          ) : (
            <button
              type="button"
              className="border border-gray-700 bg-gray-700 text-white
                        rounded-lg px-2 py-1 mx-1 transition duration-300 ease select-none hover:bg-gray-950 
                        focus:outline-none focus:shadow-outline"
              onClick={handleClickLogout}
            >
              <Link to={'/'}>로그아웃</Link>
            </button>
          )}

          <button
            type="button"
            className="border border-gray-700 bg-gray-700 text-white
                        rounded-lg px-2 py-1 mx-1 transition duration-300 ease select-none hover:bg-gray-950 
                        focus:outline-none focus:shadow-outline"
          >
            <Link to={'/user/join'}>회원가입</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
