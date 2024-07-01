import React, { useState, useEffect } from "react";
import BasicLayout from '../layouts/BasicLayout';
import CommunityPostComponent from '../components/main/CommunityPostComponent';
import TeamPostComponent from '../components/main/TeamPostComponent';
import MarketPostComponent from '../components/main/MarketPostComponent';
import BuyPostComponent from '../components/main/BuyPostComponent';
import ShareRoomPostComponent from '../components/main/shareRoomPostComponent';
import WeatherComponent from '../components/main/WeatherComponent';
import banner_dark from '../resources/images/banner_dark.png';
import banner_light from '../resources/images/banner_light.png';



import { Link } from 'react-router-dom';
import MainSliderComponent from "../components/main/MainSliderComponent";
import TypingComponent from '../components/main/TypingComponent';

const MainPage = () => {
  const [imageSrc, setImageSrc] = useState(banner_dark);
  const [textColor, setTextColor] = useState('white');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setImageSrc(banner_dark);
        setTextColor('white');
      } else {
        setImageSrc(banner_light);
        setTextColor('black');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // 가장 바깥, 배경
    <div className="bg-color">
      <hr className="vertical-line" />
      <BasicLayout>

        <div className="main-container-top mb-10">
          <div className='main-image-box'>
            {/* <img className="main-image" src={imageSrc} alt="MainImage" />
            <div className="main-image-text" style={{ color: textColor}}>
              <TypingComponent />
            </div> */}
            <MainSliderComponent />
            <div className="main-image-text">
              <TypingComponent />
            </div>

            <div className="weather-container ">
              <WeatherComponent />
            </div>
          </div>
        </div>

        <div className="background-container mt-10">
          <div className="main-container text-7xl">
            #커뮤니케이션
          </div>
          <div className="main-container">
            <div className='main-box'>
              <div className="main-comm">
                <CommunityPostComponent />
              </div>
            </div>
            <div className='main-textbox'>
              <div className='main-desc'>
                <div className="desc-title">
                  <Link to={'/community'} className="font-bold">
                    커뮤니티
                  </Link>
                </div>
                <div className="desc-tag">
                  #자취TIP공유 #질문게시판 #리뷰게시판 #도움요청
                </div>
                <div className="desc-content">
                  이웃과 정보를 공유해보세요!
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="background-container mb-20">
          <div className="main-container">
            <div className='main-textbox'>
              <div className='main-desc'>
                <div className="desc-title">
                  <Link to={'/team'} className="font-bold">
                    동네모임
                  </Link>
                </div>
                <div className="desc-tag">
                  #운동 #문화생활 #반려동물 #취미생활 #기타
                </div>
                <div className="desc-content">
                  여가활동을 함께 할 이웃을 찾아보세요!
                </div>
              </div>
            </div>
            <div className='main-box'>
              <div className="main-team ">
                <TeamPostComponent />
              </div>
            </div>
          </div>
        </div>

        <div className='my-20'>
          <div className="main-container text-7xl my-20">
            #마켓
          </div>
          <div className="main-container">
            <div>
              <div className='main-headline'>
                <Link to={'/buy'} className='font-bold'>
                  공동구매
                </Link>
                <div className="desc-tag">
                  #배달음식 #생필품 #식료품 #가구/가전 #기타
                </div>
              </div>
              <div className="main-item">
                <BuyPostComponent />
              </div>
            </div>

            <div>
              <div className='main-headline'>
                <Link to={'/market'} className="font-bold">
                  동네장터
                </Link>
                <div className="desc-tag">
                  #구매 #판매 #교환 #나눔
                </div>
              </div>
              <div className="main-item">
                <MarketPostComponent />
              </div>
            </div>
            <div>
              <div className='main-headline'>
                <Link to={'/shareroom'} className='font-bold'>
                  자취방쉐어
                </Link>
                <div className="desc-tag">
                  #최신순 #낮은 가격순 #좋아요순
                </div>
              </div>
              <div className="main-item">
                <ShareRoomPostComponent />
              </div>
            </div>
          </div>
        </div>
      </BasicLayout>
    </div>
  );
};

export default MainPage;