import React from "react";
import Slider from "react-slick";
import Logo from '../../resources/images/logo1.png';

function MultipleItemsComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={Logo} alt="LOGO1"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO2"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO3"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO4"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO5"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO6"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO7"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO8"/>
        </div>
        <div>
          <img src={Logo} alt="LOGO9"/>
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItemsComponent;