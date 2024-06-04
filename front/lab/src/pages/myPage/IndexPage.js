import BasicLayout from '../../layouts/BasicLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Profile_Img from '../../resources/images/profile_img.png';

const IndexPage = () => {
  const navigate = useNavigate();

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

  return (
    <div>
      <BasicLayout>
        <div className="text-xl flex-grow">
          <div className="min-h-screen flex flex-row bg-slate-100">
            <div className="flex flex-col w-80 bg-white shadow-md overflow-hidden">
              <ul className="flex flex-col py-4 mt-8">
                <img src={Profile_Img} alt="profileImg" className="rounded-full size-1/2 mx-auto" />
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
                    <span className="flex-1 whitespace-nowrap text-center font-bold">준현님</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex flex-row items-center h-24 group transform hover:translate-x-2 hover:cursor-pointer transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                    onClick={handleClickActivity}
                  >
                    <span className="text-lg font-semibold ml-24 group-hover:underline-offset-1">나의 활동</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex flex-row items-center h-24 transform hover:translate-x-2 hover:cursor-pointer transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                    onClick={handleClickChat}
                  >
                    <span className="text-lg font-semibold ml-24">채팅</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex flex-row items-center h-24 transform hover:translate-x-2 hover:cursor-pointer transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                    onClick={handleClickInfo}
                  >
                    <span className="text-lg font-semibold ml-24">회원정보</span>
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
