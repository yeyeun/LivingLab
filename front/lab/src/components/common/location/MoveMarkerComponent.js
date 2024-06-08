// import React, { useEffect, useRef, useState } from 'react';

// import axios from 'axios';
// import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import { useKakaoLoader } from 'react-kakao-maps-sdk';

// const MoveLocationComponent = () => {
//   const mapContainer = useRef(null); // 지도를 표시할 div를 참조합니다
//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);
//   const [message, setMessage] = useState('');
//   const [location, setLocation] = useState(null); // 현재 위치를 저장할 상태

//   useEffect(() => {
//     // 맵을 초기화합니다
//     const mapOption = {
//       center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//       level: 3, // 지도의 확대 레벨
//     };

//     const mapInstance = new window.kakao.maps.Map(mapContainer.current, mapOption);
//     setMap(mapInstance);

//     // 마커를 지도 중심에 초기화합니다
//     const markerInstance = new window.kakao.maps.Marker({
//       position: mapInstance.getCenter(),
//     });
//     markerInstance.setMap(mapInstance);
//     setMarker(markerInstance);

//     // 지도 클릭 이벤트를 등록합니다
//     window.kakao.maps.event.addListener(mapInstance, 'click', function (mouseEvent) {
//       const latlng = mouseEvent.latLng;

//       // 마커 위치를 클릭한 위치로 옮깁니다
//       markerInstance.setPosition(latlng);

//       const newMessage = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;
//       setMessage(newMessage);
//     });
//   }, []);

//   return (
//     <div className="items-center mx-auto w-fit">
//       {/* <button
//         className="px-3 py-1 mb-2 text-sm font-medium text-center inline-flex items-center text-gray-800 bg-white rounded-3xl border border-gray-800 hover:bg-gray-50"
//         onClick={getAddress}
//       >
//         <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
//           <path
//             stroke="currentColor"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="2"
//             d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
//           />
//         </svg>
//         현재 위치의 주소를 설정
//       </button> */}

//       <div
//         id="map"
//         ref={mapContainer}
//         style={{
//           width: '500px',
//           height: '400px',
//         }}
//       ></div>
//       <div id="clickLatlng">{message}</div>
//     </div>
//   );
// };

// export default MoveLocationComponent;
