import { useEffect, useState } from 'react';
import { getPartUsers, postAddPart, removePart } from '../../api/partApi';
import { API_SERVER_HOST, deleteOne, getOne } from '../../api/teamApi';
import { getUser } from '../../api/userApi';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import useCustomMove from '../../hooks/useCustomMove';
import ModalComponent from '../common/ModalComponent';
import ConfirmationModal from '../common/ConfirmationModal';
import MapComponent from '../common/MapComponent';
import iconNext from '../../resources/images/icon-next.png';
import userIcon from '../../resources/images/user.png';
import mapIcon from '../../resources/images/map.png';
import emptyheart from '../../resources/images/heart_full.png';
import PartComponent from './PartComponent';
import ResultModal from '../common/ResultModal';

const initState = {
  teamNo: 0,
  title: '',
  location: '',
  content: '',
  teamCategory: '',
  max: 0,
  current: 0,
  deadline: '',
  flag: '',
  uploadFileNames: [],
};

const initUser = {
  nickname: '',
};

const host = API_SERVER_HOST;

const ReadComponent = ({ teamNo }) => {
  const [team, setTeam] = useState(initState);
  const [user, setUser] = useState(initUser);
  const [result, setResult] = useState(null);
  const [addResultModal, setAddResultModal] = useState(null);
  const { moveToList, moveToModify } = useCustomMove();
  const loginInfo = useSelector((state) => state.loginSlice);
  const id = loginInfo?.email;
  const ino = loginInfo.id;

  // 이미지 슬라이더
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  useEffect(() => {
    getOne(teamNo).then((data) => {
      console.log(data);
      setTeam(data);
    });
  }, [teamNo]);

  useEffect(() => {
    getUser(ino).then((data) => {
      // fetchUserProfileImage(data.email);
      setUser(data);
    });
  }, [ino]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleClickAdd = async () => {
    // const formData = new FormData();
    // formData.append('nickname', user.nickname);
    console.log(user);
    postAddPart(user, teamNo);
    setResult('참여목록에 등록되었습니다.');
  };

  const closeModal = () => {
    setResult(null);
    // moveToList();
  };

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

  const handleConfirm = () => {
    deleteOne(teamNo);
    setShowConfirm(false);
    moveToList();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  //날짜 포맷 설정
  const formatDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    const padZero = (num) => num.toString().padStart(2, '0'); //숫자를 2자리 문자열로 반환
    const isToday = (date) => {
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
    };

    const hours = deadlineDate.getHours();
    const minutes = padZero(deadlineDate.getMinutes());
    const amPm = hours < 12 ? '오전' : '오후';
    const displayHours = padZero(hours % 12 || 12); // 24시간 포맷을 12시간 포맷으로 변경

    if (isToday(deadlineDate)) {
      return `오늘 ${amPm} ${displayHours}:${minutes}까지`;
    } else {
      const year = deadlineDate.getFullYear();
      const month = padZero(deadlineDate.getMonth() + 1);
      const day = padZero(deadlineDate.getDate());
      return `${year}-${month}-${day} ${amPm} ${displayHours}:${minutes}까지`;
    }
  };

  return (
    <>
      <div className="bg-slate-100 w-2/5 ml-auto p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-left font-semibold ml-2 items-center flex">
            {team.flag ? '모집 마감' : '모집 중'}
            <img src={iconNext} alt="..." className="w-7 inline" />
          </span>
          <span className="text-right text-base">{formatDeadline(team.deadline)}</span>
        </div>
        <div className="grid grid-cols-10 w-full mx-auto mt-4 mb-1 text-xl bg-white">
          <div className="col-start-9 col-span-2 ml-5 mt-4 text-right flex justify-center">
            <img src={emptyheart} alt="..." className="w-7 mr-3 inline" />
            {team.teamHit}
          </div>
          <div className="col-start-3 col-span-6 h-72 mt-3 mb-10">
            {team.uploadFileNames.length > 0 ? (
              <Slider {...settings}>
                {team.uploadFileNames.map((imgFile, i) => (
                  <img alt="team" key={i} src={`${host}/api/team/display/${imgFile}`} className="object-contain w-full h-72" />
                ))}
              </Slider>
            ) : (
              <img alt="team" src={`${host}/api/team/display/default.png`} className="object-contain w-full h-72" />
            )}
          </div>
          <div className="col-start-2 col-span-3 text-base">
            <span className="text-base rounded-3xl text-slate-700 text-center py-1 px-3 mr-2 bg-blue-100 border-blue-300 border">
              {team.teamCategory === '1' && '운동'}
              {team.teamCategory === '2' && '문화생활'}
              {team.teamCategory === '3' && '반려동물'}
              {team.teamCategory === '4' && '취미생활'}
              {team.teamCategory === '5' && '기타'}
            </span>
            <span className="text-base rounded-3xl text-slate-700 text-center py-1 px-3 bg-neutral-100 border-neutral-300 border">
              <img src={userIcon} alt="..." className="w-3 inline mb-1" />
              &ensp;{team.current} / {team.max}
            </span>
          </div>

          <div className="col-start-2 col-span-6 text-slate-700 text-2xl my-5">{team.title}</div>
          <div className="col-start-2 col-span-6 text-base">
            <img src={mapIcon} alt="..." className="w-5 inline" />
            &ensp;{team.location}
          </div>
          <div className="col-start-2 col-span-8"></div>
          <div className="col-start-8 col-span-2 text-right text-base">{team.nickname}</div>
          <div className="col-start-2 col-span-8 my-5 border-t-4 py-4">{team.content}</div>
          <div className="col-start-2 col-span-8 h-80">
            <MapComponent location={team.location} />
          </div>
          {/* <div className="col-start-2 col-span-8 my-6">
            <div className="flex justify-between space-x-4"> */}
          {id === team.user_id ? (
            <>
              <div className="col-start-2 col-span-8 my-6">
                <div className="flex justify-between space-x-4">
                  {/* <div className="flex"> */}
                  {/* <div className="flex mr-auto"> */}
                  <button className="text-base text-white bg-orange-400 p-2 rounded-md w-1/4 mr-2 hover:bg-red-500" onClick={() => moveToModify(teamNo)}>
                    수정하기
                  </button>
                  <button className="text-base text-white bg-red-400 p-2 rounded-md w-1/4 mr-2 hover:bg-slate-500" onClick={handleDeleteClick}>
                    삭제하기
                  </button>
                  {/* </div> */}

                  <button className="text-base text-white bg-blue-400 p-2 rounded-md w-1/4 mr-2 hover:bg-blue-500" onClick={handleClickAdd}>
                    참여하기
                  </button>
                  <button className="text-base text-white bg-slate-400 p-2 rounded-md w-1/4 hover:bg-slate-500" onClick={() => moveToList()}>
                    목록
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-start-6 col-span-4 my-6">
                <div className="flex justify-between space-x-4">
                  <button className="text-base text-white bg-blue-400 p-2 rounded-md w-1/2 mr-2 hover:bg-blue-500" onClick={handleClickAdd}>
                    참여하기
                  </button>
                  <button className="text-base text-white bg-slate-400 p-2 rounded-md w-1/2 hover:bg-slate-500" onClick={() => moveToList()}>
                    목록
                  </button>
                </div>
              </div>
            </>
          )}
          {/* </div>
          </div> */}
          {result && <ResultModal title={'알림'} content={`${result}`} callbackFn={closeModal} />}
          {addResultModal && <ResultModal title={'알림'} content={`${addResultModal}`} callbackFn={() => setAddResultModal(null)} />}

          <ModalComponent show={showModal} onClose={handleCloseModal} teamNo={teamNo} />
          <ConfirmationModal show={showConfirm} message={modalMessage} onConfirm={handleConfirm} onCancel={handleCancel} />
        </div>
      </div>
    </>
  );
};
export default ReadComponent;
