import React, { useEffect, useState } from 'react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';

const { kakao } = window;

const App = () => {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map && currCategory) {
      const ps = new kakao.maps.services.Places(map);
      kakao.maps.event.addListener(map, 'idle', () => searchPlaces(ps));
    }
  }, [map, currCategory]);

  useEffect(() => {
    if (places.length > 0) {
      const order = document.getElementById(currCategory).getAttribute('data-order');
      const newMarkers = places.map((place) =>
        addMarker(new kakao.maps.LatLng(place.y, place.x), order, place)
      );
      setMarkers(newMarkers);
    }
  }, [places]);

  const searchPlaces = (ps) => {
    if (!currCategory) return;
    setSelectedPlace(null);
    removeMarkers();

    ps.categorySearch(currCategory, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
      }
    }, { useMapBounds: true });
  };

  const removeMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const addMarker = (position, order, place) => {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png';
    const imageSize = new kakao.maps.Size(27, 28);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(72, 208),
      spriteOrigin: new kakao.maps.Point(46, (order * 36)),
      offset: new kakao.maps.Point(11, 28)
    };
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new kakao.maps.Marker({
      position,
      image: markerImage
    });

    marker.setMap(map);

    kakao.maps.event.addListener(marker, 'click', () => {
      setSelectedPlace(place);
    });

    return marker;
  };

  const displayPlaceInfo = (place) => {
    return (
      <div className="placeinfo">
        <a className="title" href={place.place_url} target="_blank" rel="noopener noreferrer" title={place.place_name}>
          {place.place_name}
        </a>
        {place.road_address_name ? (
          <span title={place.road_address_name}>{place.road_address_name}</span>
        ) : (
          <span title={place.address_name}>{place.address_name}</span>
        )}
        <span className="tel">{place.phone}</span>
        <div className="after"></div>
      </div>
    );
  };

  const handleCategoryClick = (id) => {
    if (currCategory === id) {
      setCurrCategory('');
      removeMarkers();
    } else {
      setCurrCategory(id);
      searchPlaces();
    }
  };

  return (
    <div>
      <div id="category">
        <button id="category1" onClick={() => handleCategoryClick('MT1')} data-order="0">마트</button>
        <button id="category2" onClick={() => handleCategoryClick('CS2')} data-order="1">편의점</button>
        {/* Add more categories as needed */}
      </div>
      <Map
        center={{ lat: 37.566826, lng: 126.9786567 }}
        level={5}
        onCreate={setMap}
        style={{ width: '100%', height: '500px' }}
      >
        {selectedPlace && (
          <CustomOverlayMap position={{ lat: selectedPlace.y, lng: selectedPlace.x }}>
            {displayPlaceInfo(selectedPlace)}
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
};

export default App;