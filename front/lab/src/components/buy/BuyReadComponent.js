import { useEffect, useState } from 'react';
import { API_SERVER_HOST, getOne } from '../../api/buyApi';
import useCustomMove from '../../hooks/useCustomMove';
import MapComponent from '../common/MapComponent';
import LandingComponent from '../common/mapSearch/LandingComponent';
import ModalComponent from '../common/ModalComponent';

const initState = {
  buyNo: 0,
  title: '',
  location: '',
  content: '',
  category: '',
  max: 0,
  current: 0,
  deadline: '',
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const BuyReadComponent = ({ buyNo }) => {
  const [buy, setBuy] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();
  const [recruit, setRecruit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 모집이 마감일을 넘겼는지 체크
  const checkDeadline = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    if (currentDate > deadlineDate) {
      setRecruit(true);
    } else {
      setRecruit(false);
    }
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    getOne(buyNo).then((data) => {
      console.log(data);
      setBuy(data);
    });
  }, [buyNo]);

  useEffect(() => {
    checkDeadline(buy.deadline);
  }, [buy.deadline]);
  return (
    <>
      <div className="detail-container">
        <div>
          <div className="flex justify-between">
            <div className="my-5 mx-5">{recruit ? <span>모집 종료</span> : <span>모집 중</span>}</div>
            <div className="my-5 mx-5">{buy.deadline} 까지</div>
          </div>
          <div className="image-upload">
            {buy.uploadFileNames.map((imgFile, i) => (
              <img alt="buy" key={i} src={`${host}/api/buy/display/${imgFile}`} />
            ))}
          </div>
          <div className="text-center my-5">
            <span className="tag-button">
              {buy.buyCategory === '1' && '구매'}
              {buy.buyCategory === '2' && '판매'}
              {buy.buyCategory === '3' && '교환'}
              {buy.buyCategory === '4' && '나눔'}
            </span>
            <span className="tag-button">마감일 : {buy.deadline}</span>
          </div>
          <div className="detail-box p-2">제목 : {buy.title}</div>
          <div className="detail-box p-2">장소 : {buy.location}</div>
          <div className="detail-box p-2">작성자 : {buy.nickname}</div>
          <div className="detail-content p-2">{buy.content}</div>
          <div className="map-container">
            지도
            <div className="map-draw">
              <MapComponent location={buy.location} />
            </div>
          </div>
          <div className="detail-footer text-center">
            <div></div>
            <div>
              <button className="button-part mr-3" onClick={handleOpenModal}>
                참여하기
              </button>
              <button className="button-return" onClick={() => moveToList()}>
                목록
              </button>
            </div>
          </div>
        </div>
        <ModalComponent show={showModal} onClose={handleCloseModal} />
      </div>

      {/* 키워드로 장소검색해서 지도 표시 */}
      <div className="mt-10 ml-80">
        <LandingComponent />
      </div>
    </>
  );
};

export default BuyReadComponent;
