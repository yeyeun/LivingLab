import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../resources/images/logo1.png';

const Header = () => {
    return(
        <nav id='navbar' className="bg-white flex-wrap relative flex w-full items-center justify-start py-3 border-b">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                {/* left section */}
                <div className="flex items-center basis-auto text-xl font-semibold">
                    <img src={Logo} alt="LOGO" className="w-60"/>
                    <ul className="flex flex-row p-3 list-none me-auto">
                        <li className="pr-10 pl-5">
                            <Link to={'/'} className="menu-hover">홈</Link>
                        </li>
                        <li className="pr-10">
                            <Link to={'/buy'} className="menu-hover">공동구매</Link>
                        </li>
                        <li className="pr-10">
                            <Link to={'/team'} className="menu-hover">동네모임</Link>
                        </li>
                        <li className="pr-10">
                            <Link to={'/market'} className="menu-hover">동네장터</Link>
                        </li>
                        <li className="pr-10">
                            <Link to={'/livingRoom'} className="menu-hover">자취방쉐어</Link>
                        </li>
                        <li className="pr-10">
                            <Link to={'/community'} className="menu-hover">커뮤니티</Link>
                        </li>
                    </ul>
                </div>
                {/* right section */}
                <div className="relative flex items-center">
                    <button type="button" className="border border-gray-700 bg-gray-700 text-white rounded-lg px-2 py-1 mx-1 transition duration-300 ease select-none hover:bg-gray-950 focus:outline-none focus:shadow-outline">로그인</button>
                    <button type="button" className="border border-gray-700 bg-gray-700 text-white rounded-lg px-2 py-1 mx-1 transition duration-300 ease select-none hover:bg-gray-950 focus:outline-none focus:shadow-outline">회원가입</button>
                </div>
            </div>
        </nav>
    );
}

export default Header;