import { useEffect, useState } from 'react';
import ProfileComponent from '../common/ProfileComponent';
import { useDispatch, useSelector } from 'react-redux';
import useCustomLogin from './../../hooks/useCustomLogin';
import ModalComponent from '../common/ModalComponent';
import { chatUserInfoBuy } from '../../api/chatApi';
import { getUser } from '../../api/userApi'

const PartComponent = ({ buyNo }) => {

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [chatroomInfo, setChatroomInfo] = useState(null);
  const [displayUsers, setDisplayUsers] = useState([]);


  useEffect(() => {
    const fetchChatroomData = async () => {
      try {
        const chatroomResponse = await chatUserInfoBuy(buyNo);
        const chatroomData = chatroomResponse.data;
        setChatroomInfo(chatroomData);

        // 작성자 정보 가져오기
        const writerResponse = await getUser(chatroomData.writerId);

        // 참여자 정보 가져오기
        const readerDataPromises = chatroomData.readerId.map((readerId) => getUser(readerId));
        const readerResponses = await Promise.all(readerDataPromises);
        
        // 화면에 표시할 유저들 정보 설정
        const participants = [writerResponse, ...readerResponses];
        setDisplayUsers(participants);

      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    fetchChatroomData();
  }, [buyNo]);

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
    <div className="flex justify-center bg-slate-100 w-1/5 p-4 ml-10 mr-20 rounded-lg h-30">
      <div className="w-full">
        <div className="bg-blue-200 rounded-lg text-center p-4">
          <h2>참여 인원</h2>
        </div>
        <hr />
        <div className>
          <div>
            {displayUsers.map((user) => (
              <div className="flex p-5" key={user.id}>
                <img alt="Profile_Img" src={`http://localhost:8282/api/user/userProfileImage?email=${user.email}`} className="rounded-full size-10 mr-2" />
                {user.nickname}
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
