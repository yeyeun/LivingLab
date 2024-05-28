import { Link } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import MultipleItems from '../components/products/MultipleItemsComponent';

const MainPage = () => {
  return (
    // <BasicLayout>
    //   <div className="flex">
    //     <Link to={"/about"}>About</Link>
    //   </div>
    //   <div className="text-3xl">
    //     <div>Main Page</div>
    //   </div>
    // </BasicLayout>
    <div className="flex flex-col">
      <BasicLayout>
        <div className="flex-grow text-2xl">
          <MultipleItems />
        </div>
      </BasicLayout>
    </div>
  );
};

export default MainPage;
