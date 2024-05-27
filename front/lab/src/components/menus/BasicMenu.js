import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BasicMenu = () => {
  // 아래 한 줄 코드 userSelector로 어디서든간에 로그인 데이터가 바뀌는 걸 알 수 있다.
  // 이게 리덕스 툴킷이 하는 일
  const loginState = useSelector((state) => state.loginSlice);

  return (
    <nav id="navbar" className="flex bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl">
            <Link to={'/'}>Main</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={'/about'}>About</Link>
          </li>

          {loginState.email ? (
            <>
              <li className="pr-6 text-2xl">
                <Link to={'/todo/'}>Todo</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={'/products/'}>Products</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={'/buy/'}>공동구매</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={'/team/'}>동네모임</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={'/market/'}>동네장터</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={'/livingRoom/'}>자취방쉐어</Link>
              </li>
              <li className="pr-6 text-2xl">
                <Link to={'/community/'}>커뮤니티</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
        <div className="text-white text-sm m-1 rounded">
          <Link to={'/member/join'}>회원가입</Link>
        </div>

        {!loginState.email ? (
          <div className="text-white text-sm m-1 rounded">
            <Link to={'/member/login'}>로그인</Link>
          </div>
        ) : (
          <div className="text-white text-sm m-1 rounded">
            <Link to={'/member/logout'}>로그아웃</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default BasicMenu;
