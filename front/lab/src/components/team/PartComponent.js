import { useEffect, useState } from 'react';
import ProfileComponent from '../common/ProfileComponent';
import { useDispatch, useSelector } from 'react-redux';
import { API_SERVER_HOST, deleteOne, getOne } from '../../api/teamApi';
import { getPartUsers, postAddPart, removePart } from '../../api/partApi';
import useCustomLogin from './../../hooks/useCustomLogin';
import ModalComponent from '../common/ModalComponent';

const initState = {
  teamNo: 0,
  nickname: '',
};

const PartComponent = ({ part }) => {
  // const { isLogin, loginState } = useCustomLogin();

  // const loginInfo = useSelector((state) => state.loginSlice);

  // const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const displayPart = part || []; // 만약 part가 undefined이면 빈 배열로 초기화

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteClick = () => {
    setModalMessage('삭제하시겠습니까?');
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex justify-center bg-slate-100 w-1/5 p-4 ml-10 rounded-lg h-30">
      <div className="w-full">
        <div className="bg-blue-200 rounded-lg text-center p-4">
          <h2>참여 인원</h2>
        </div>
        <hr />
        <div className>
          <div>
            {displayPart.map((partUser) => (
              <div key={partUser.pino}>
                <div className="p-4">{partUser.nickname}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-5">
          <button className="text-base text-white bg-blue-400 p-2 rounded-md w-1/2 mr-2 hover:bg-blue-500" onClick={handleOpenModal}>
            채팅
          </button>
          <button className="text-base text-white bg-slate-400 p-2 rounded-md w-1/2 hover:bg-slate-500">참여 X</button>
        </div>
      </div>
      <ModalComponent show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default PartComponent;
