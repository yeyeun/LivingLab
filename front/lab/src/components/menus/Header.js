import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../resources/images/logo1.png';

const Header = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    if (path === '/') {
      return location.pathname === path ? 'header-active' : 'menu-hover color-wood';
    }
    return location.pathname.startsWith(path) && location.pathname !== '/' ? 'header-active' : 'menu-hover color-wood';
  };

  return (
    <nav
      id="navbar"
      className="bg-white flex-wrap relative flex w-full items-center justify-start py-3 border-b-2"
    >
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
          <Link to={'/member/login'}>
            <button
              type="button"
              className="border border-gray-700 bg-gray-700 text-white 
                          rounded-lg px-2 py-1 mx-1 transition duration-300 ease select-none hover:bg-gray-950 
                          focus:outline-none focus:shadow-outline"
            >
              로그인
            </button>
          </Link>
          <Link to={'/member/join'}>
            <button
              type="button"
              className="border border-gray-700 bg-gray-700 text-white
                          rounded-lg px-2 py-1 mx-1 transition duration-300 ease select-none hover:bg-gray-950 
                          focus:outline-none focus:shadow-outline"
            >
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
