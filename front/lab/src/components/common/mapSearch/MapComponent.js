import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const { kakao } = window;

const MapComponent = ({ searchPlace }) => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  const [address, setAddress] = useState(''); // 현재 좌표의 주소를 저장할 상태
  const [location, setLocation] = useState(''); // 현재 위치를 저장할 상태

  const successHandler = (response) => {
    //console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  });

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('myMap');

    const options = {
      center: new kakao.maps.LatLng(location.latitude, location.longitude), // 현재 나의 실시간 좌표
      //center: new kakao.maps.LatLng(35.8121472, 128.6176768),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options); // 지도 생성

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);

        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace, location.latitude, location.longitude]);

  return (
    <div className="flex flex-col">
      <div
        id="myMap"
        style={{
          width: '100%',
          height: '400px',
          // position: 'absolute',
        }}
      ></div>

      {/* 검색 결과는 최대 45개까지만 제공 */}
      <div id="result-list">
        {Places.map((item, i) => (
          <div id="result-one" key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}.&nbsp;</span>
            <div>
              <div className="text-xl">{item.place_name}</div>
              {item.road_address_name ? (
                <div className="text-sm">
                  <span>{item.road_address_name}</span>
                  <br />
                  <span>({item.address_name})</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <div className="text-sm">
                <span>{item.phone}</span>
              </div>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default MapComponent;
