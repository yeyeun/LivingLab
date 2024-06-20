import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import { modifyUser, getUser } from '../../../api/userApi';
import ResultModal from '../ResultModal';

const initState = {
  id: '',
  email: '',
  name: '',
  phone: '',
  nickname: '',
  pwd: '',
  pwdCheck: '',
  addr: '',
  detailAddr: '',
  profileImage: '',
  location: '',
};

const LocationComponent = () => {
  const { kakao } = window;
  const [address, setAddress] = useState(''); // 현재 좌표의 주소를 저장할 상태
  const [location, setLocation] = useState(''); // 현재 위치를 저장할 상태
  const [isOpen, setIsOpen] = useState(false); // 현재 위치 지도창 열기,닫기
  const [addResultModal, setAddResultModal] = useState(null);

  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보
  const ino = loginInfo?.id;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = (response) => {
    //console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  const getAddress = (user) => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(location.latitude, location.longitude); // 주소로 변환할 좌표 입력
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }

      const modifiedUser = user;
      modifiedUser.location = result[0].address.address_name;
      modifyUser(modifiedUser); // 상태값 변경된 거 DB에 반영
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback); // 좌표로 법정동 상세 주소 정보를 요청합니다

    // const center = {
    //   // 지도의 중심좌표
    //   lat: location.latitude,
    //   lng: location.longitude,
    // };
    // console.log(center);
  };

  const handleLocation = (user) => {
    getAddress(user); // 실시간 위치 주소 받아옴

    if (isOpen === false) setIsOpen(true);
    else setIsOpen(false);
  };

  const handleClickLocation = (e) => {
    if (!ino) {
      setAddResultModal('로그인 후 이용할 수 있습니다');
    } else {
      alert('현재 위치가 실시간 반영되었습니다.');
      getUser(ino).then((user) => {
        setUser(user);
        handleLocation(user);
      });
    }
  };

  const handleModalClose = () => {
    setIsOpen(false); // 모달 닫기
    setAddResultModal(null);
  };

  return (
    <div className="flex flex-col items-center mx-auto w-fit">
      <button
        className="px-3 py-1 mb-2 text-sm font-medium text-center inline-flex items-center text-gray-800 bg-white rounded-3xl border border-gray-800 hover:bg-gray-50"
        onClick={() => handleClickLocation()}
      >
        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
          />
        </svg>
        현재 위치 설정
      </button>

      <div>
        {isOpen && (
          <ResultModal
            title={'위치 설정'}
            content={
              <div className="flex flex-col items-center">
                <Map center={{ lat: location.latitude, lng: location.longitude }} style={{ width: '500px', height: '300px' }} level={3} onClick={getAddress}>
                  <MapMarker position={{ lat: location.latitude, lng: location.longitude }} />
                </Map>
                <p>현재 위치 : {address.address_name}</p>
              </div>
            }
            callbackFn={handleModalClose}
          />
        )}
      </div>
      {addResultModal && <ResultModal title={'알림'} content={addResultModal} callbackFn={handleModalClose} />}
    </div>
  );
};
export default LocationComponent;
