import MyBuyComponent from '../../../components/myPage/myActivity/MyBuyComponent';
import MyTeamComponent from '../../../components/myPage/myActivity/MyTeamComponent';
import MyMarketComponent from '../../../components/myPage/myActivity/MyMarketComponent';
import MyShareRoomComponent from '../../../components/myPage/myActivity/MyShareRoomComponent';
import MyCommunityComponent from '../../../components/myPage/myActivity/MyCommunityComponent';
import MyLikeComponent from '../../../components/myPage/myActivity/MyLikeComponent';
import { useSelector } from 'react-redux';

const MyActivityPage = () => {
  const loginInfo = useSelector((state) => state.loginSlice);
  const id = loginInfo.id;

  return (
    <div className="text-xl flex-grow h-fit flex w-4/5">
      <div className="bg-white w-full rounded px-10 py-4 h-full shadow-md">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-2xl pl-2 my-2 border-l-4 font-Jua border-teal-300">나의 활동</div>
                <div className="flex h-full justify-center">
                  <MyBuyComponent id={id}/>
                  <MyTeamComponent id={id}/>
                </div>
                <div className="flex h-full justify-center">
                  <MyMarketComponent id={id}/>
                  <MyShareRoomComponent id={id}/>
                </div>
                <div className="flex h-full justify-center">
                  <MyCommunityComponent id={id}/>
                  <MyLikeComponent id={id}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivityPage;
