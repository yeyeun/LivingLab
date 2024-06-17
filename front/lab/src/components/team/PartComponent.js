import ProfileComponent from '../common/ProfileComponent';

const initState = {};

const PartComponent = ({ teamNo }) => {
  return (
    <div className="bg-slate-100 w-1/5 p-4 ml-10 mr-20 rounded-lg h-30">
      <div className>
        <div className>
          <div className>
            <h2>참여 인원(/)</h2>
          </div>
          <hr />
          <div className>
            <div>
              <ProfileComponent />
              <ProfileComponent />
              <ProfileComponent />
            </div>
          </div>

          <div className="flex">
            <button className="text-base text-white bg-blue-400 p-2 rounded-md w-1/2 mr-2 hover:bg-blue-500">채팅하기</button>
            <button className="text-base text-white bg-slate-400 p-2 rounded-md w-1/2 hover:bg-slate-500">빠지기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartComponent;
