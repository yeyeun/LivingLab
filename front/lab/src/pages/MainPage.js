import BasicLayout from '../layouts/BasicLayout';
//import MultipleItems from '../components/products/MultipleItemsComponent';
import Main from '../resources/images/main1.png';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <BasicLayout>
        <div className="main-container-top">
          <img className="main-image" src={Main} alt="MainImage" />
        </div>

        {/* <div className="main-slide">
          <a className="main-headline">자취 TIP ✔</a>
          <MultipleItems />
        </div> */}

        <div className="main-container">
          <div>
            <Link to={'/community'} className="main-headline">
              커뮤니티
            </Link>
            <div className="main-item2"></div>
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
            <div className="main-item"></div>
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
