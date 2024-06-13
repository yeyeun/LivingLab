import BasicLayout from '../layouts/BasicLayout';
//import MultipleItems from '../components/products/MultipleItemsComponent';
import Main from '../resources/images/main1.png';
import Slide1 from '../resources/images/slide_1.png';
import Slide2 from '../resources/images/slide_2.png';
import Slide3 from '../resources/images/slide_3.png';
import Slide4 from '../resources/images/slide_4.png';
import Slide5 from '../resources/images/slide_5.png';
import MainBuy from '../resources/images/main_buy.jpg'
import LatestPostComponent from '../components/main/LastestPostComponent';
import ListComponent from '../components/community/help/ListComponent';

import { Link } from 'react-router-dom';
import React from "react";
import Slider from "react-slick";



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
    <div>

      <BasicLayout>
        
        <div className="main-container-top mt-10 mb-5">
          <img className="main-image" src={Main} alt="MainImage" />
        </div>

        <div className="main-slide-container">
          <div className="main-headline mb-2">
            <a>자취 TIP ✔</a>
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

        <div className="main-container">
          <div>
            <Link to={'/community'} className="main-headline">
              커뮤니티
            </Link>
            <div className="main-item2">
            <LatestPostComponent/>
            </div>
          </div>
          <div>
            <Link to={'/team'} className="main-headline">
              동네모임
            </Link>
            <div className="main-item3"></div>
          </div>
        </div>  
        <div className="main-container">
          <div>
            <Link to={'/buy'} className="main-headline">
              공동구매
            </Link>
            <div className="main-item overflow-hidden	" >
              <img alt="slide_5" src={MainBuy} />

            </div>
          </div>
          <div>
            <Link to={'/market'} className="main-headline">
              동네장터
            </Link>
            <div className="main-item"></div>
          </div>
        </div>
      </BasicLayout>
    </div>
  );
};

export default MainPage;
