import BasicLayout from '../layouts/BasicLayout';
//import MultipleItems from '../components/products/MultipleItemsComponent';
import Main from '../resources/images/main1.png';
import Slide1 from '../resources/images/slide_1.png';
import Slide2 from '../resources/images/slide_2.png';
import Slide3 from '../resources/images/slide_3.png';
import Slide4 from '../resources/images/slide_4.png';
import Slide5 from '../resources/images/slide_5.png';
import CommunityPostComponent from '../components/main/CommunityPostComponent';
import TeamPostComponent from '../components/main/TeamPostComponent';
import MarketPostComponent from '../components/main/MarketPostComponent';
import BuyPostComponent from '../components/main/BuyPostComponent';
import ShareRoomPostComponent from '../components/main/shareRoomPostComponent';
import WeatherComponent from '../components/main/WeatherComponent';
import img_main from '../resources/images/img_main5.png';



import { Link } from 'react-router-dom';
import React from "react";
import Slider from "react-slick";
import TypingComponent from '../components/main/TypingComponent';



const MainPage = () => {

  // 슬라이드 세팅
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

  };


  return (
    //가장 바깥, 배경
    <div className="bg-color">
      <hr className="vertical-line" />

      <BasicLayout>
        <div className="main-container-top mb-10">
          <img className="main-image" src={img_main} alt="MainImage" />
          <div className="main-image-text">
            <TypingComponent />
            <hr className="weather-hr "/>
            </div>
          
          <div className="weather-container "> 
            <WeatherComponent/>

          </div>
        </div>


        {/* <div className="main-container text-6xl">
          #지금 HOT 게시물
          </div>
          <div className="main-container">

          <div className="main-slide-container">
            <div className="main-headline mb-2">
            </div>
            <Slider {...settings}>
              <div>
                <img alt="slide_1" src={Slide1} className="main-slide" />
              </div>
              <div>
                <img alt="slide_2" src={Slide2} className="main-slide" />

              </div>
              <div>
                <img alt="slide_3" src={Slide3} className="main-slide" />

              </div>
              <div>
                <img alt="slide_4" src={Slide4} className="main-slide" />

              </div>
              <div>
                <img alt="slide_5" src={Slide5} className="main-slide" />

              </div>
            </Slider>
          </div>
         
        </div> */}



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
              <div className="main-item" >
                <ShareRoomPostComponent />

              </div>

            </div>

          </div></div>

      </BasicLayout>
    </div>
  );
};

export default MainPage;
