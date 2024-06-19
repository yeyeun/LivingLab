import React, { useEffect, useState } from 'react';

const { kakao } = window;

const KakaoMapComponent = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [placeOverlay, setPlaceOverlay] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 5,
    };
    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);

    const overlayNode = document.createElement('div');
    overlayNode.className = 'placeinfo_wrap';
    const newPlaceOverlay = new kakao.maps.CustomOverlay({
      zIndex: 1,
      content: overlayNode,
    });
    setPlaceOverlay(newPlaceOverlay);

    kakao.maps.event.addListener(newMap, 'idle', () => searchPlaces(currCategory, newMap));

    return () => {
      kakao.maps.event.removeListener(newMap, 'idle', searchPlaces);
    };
  }, []);

  const addEventHandle = (target, type, callback) => {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent('on' + type, callback);
    }
  };

  const searchPlaces = (category, map) => {
    if (!category) {
      return;
    }

    placeOverlay.setMap(null);
    removeMarker();

    const ps = new kakao.maps.services.Places(map);
    ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
  };

  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 검색 결과가 없을 때 처리
    } else if (status === kakao.maps.services.Status.ERROR) {
      // 에러 처리
    }
  };

  const displayPlaces = (places) => {
    const newMarkers = places.map((place) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({
        position,
        map,
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        displayPlaceInfo(place);
      });
      return marker;
    });
    setMarkers(newMarkers);
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const displayPlaceInfo = (place) => {
    const content = `<div class="placeinfo">
      <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>
      <span title="${place.road_address_name || place.address_name}">${place.road_address_name || place.address_name}</span>
      <span class="tel">${place.phone}</span>
    </div><div class="after"></div>`;

    const overlayNode = placeOverlay.getContent();
    overlayNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
  };

  const onClickCategory = (category) => {
    setCurrCategory(category);
    searchPlaces(category, map);
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }} />
      <div>
        <button onClick={() => onClickCategory('FD6')}>음식점</button>
        <button onClick={() => onClickCategory('CE7')}>카페</button>
        <button onClick={() => onClickCategory('HP8')}>병원</button>
      </div>
    </div>
  );
};

export default KakaoMapComponent;