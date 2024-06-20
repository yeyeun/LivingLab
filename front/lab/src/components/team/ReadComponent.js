import { useEffect, useState } from 'react';
import axios from 'axios';
import { getPartUsers, postAddPart, removePart } from '../../api/partApi';
import { API_SERVER_HOST, deleteOne, getOne } from '../../api/teamApi';
import { getUser } from '../../api/userApi';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import useCustomMove from '../../hooks/useCustomMove';
import ModalComponent from '../common/ModalComponent';
import MapComponent from '../common/MapComponent';
import iconNext from '../../resources/images/icon-next.png';
import userIcon from '../../resources/images/user.png';
import mapIcon from '../../resources/images/map.png';
import emptyheart from '../../resources/images/heart_full.png';
import ResultModal from '../common/ResultModal';
import PartComponent from './PartComponent';
import Profile_Img from '../../resources/images/profile_img.png';
import LandingComponent from './../common/mapSearch/LandingComponent';

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
  profileImage: '',
};

const host = API_SERVER_HOST;

const ReadComponent = ({ teamNo }) => {
  const [team, setTeam] = useState(initState);
  const [user, setUser] = useState(initUser);
  const [result, setResult] = useState(null);
  const [part, setPart] = useState([]); // 참여 목록 상태 추가
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
      setTeam(data);
    });
  }, [teamNo]);

  useEffect(() => {
    getUser(ino).then((data) => {
      fetchUserProfileImage(data.email);
      setUser(data);
    });
  }, [ino]);

  useEffect(() => {
    getPartUsers(teamNo).then((data) => {
      setPart(data);
    });
  }, [teamNo]);

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleClickAdd = async () => {
    try {
      await postAddPart(user, teamNo); // 참여하기 요청 비동기 처리
      setResult('참여목록에 등록되었습니다.');
      // 참여 목록 갱신
      const updatedPart = await getPartUsers(teamNo);
      setPart(updatedPart);
    } catch (error) {
      console.error('참여 등록 실패:', error);
      setResult('참여 등록에 실패했습니다.');
    }
  };

  const closeModal = () => {
    setResult(null);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickDelete = (e) => {
    deleteOne(teamNo);
    setResult('게시글이 삭제되었습니다');
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

  //프로필 사진 읽어오는 함수
  const fetchUserProfileImage = async (email) => {
    try {
      const res = await axios.get(`http://localhost:8282/api/user/userProfileImage?email=${email}`, {
        responseType: 'arraybuffer', // 바이너리 데이터로 응답받기
      });

      // 받은 바이너리 데이터 처리
      const blob = new Blob([res.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      setUser((prev) => ({
        ...prev, // 이전 상태를 복사해야 이미지 삭제하고 다시 변경했을 대 바로 적용됨
        profileImage: imageUrl, // 이미지 데이터 추가
      }));
      console.log('프로필 사진 읽기 최종 성공');
    } catch (error) {
      console.error('프로필 이미지가 없습니다', error);
      // 오류가 발생하면 대체 이미지를 사용하도록 설정
      setUser((prev) => ({
        ...prev,
        profileImage: Profile_Img,
      }));
    }
  };

  return (
    <>
      <div className=" bg-slate-200 w-1/4 rounded-md px-4 py-4">
        <LandingComponent />
      </div>
      <div className="bg-slate-100 w-2/5 ml-5 p-4 rounded-lg">
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
          <div className="col-start-2 col-span-8 my-5 border-t-4 py-4 whitespace-pre-wrap">{team.content}</div>
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
                  <button className="text-base text-white bg-red-400 p-2 rounded-md w-1/4 mr-2 hover:bg-slate-500" onClick={handleClickDelete}>
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

          <ModalComponent show={showModal} onClose={handleCloseModal} />
          {result && <ResultModal title={'알림'} content={`${result}`} callbackFn={closeModal} />}
        </div>
      </div>
      {/* 참여인원 목록 컴포넌트 */}
      <PartComponent teamNo={teamNo} part={part} /> {/* PartComponent에 참여 인원 전달 */}
    </>
  );
};
export default ReadComponent;
