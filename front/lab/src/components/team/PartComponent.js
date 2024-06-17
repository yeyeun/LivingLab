import { useEffect, useState } from 'react';
import ProfileComponent from '../common/ProfileComponent';
import { useDispatch, useSelector } from 'react-redux';
import { API_SERVER_HOST, deleteOne, getOne } from '../../api/teamApi';
import { getPartUsers, postAddPart, removePart } from '../../api/partApi';
import useCustomLogin from './../../hooks/useCustomLogin';

const initState = {
  teamNo: 0,
  nickname: '',
};

const PartComponent = ({ teamNo }) => {
  const [part, setPart] = useState([]);
  const [serverData, setServerData] = useState([]);

  const { isLogin, loginState } = useCustomLogin();

  const loginInfo = useSelector((state) => state.loginSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    getPartUsers(teamNo).then((data) => {
      setPart(data);
    });
  }, [teamNo]);

  return (
    <div className="bg-slate-100 w-1/5 p-4 ml-10 mr-20 rounded-lg h-30">
      <div className>
        <div className>
          <div className="bg-blue-200 rounded-lg text-center p-4">
            <h2>참여 목록</h2>
          </div>
          <hr />
          <div className>
            <div>
              {part.map((partUser) => (
                <div key={partUser.pino}>
                  <div className="p-4">{partUser.nickname}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex mt-5">
            <button className="text-base text-white bg-blue-400 p-2 rounded-md w-1/2 mr-2 hover:bg-blue-500">채팅하기</button>
            <button className="text-base text-white bg-slate-400 p-2 rounded-md w-1/2 hover:bg-slate-500">빠지기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartComponent;
