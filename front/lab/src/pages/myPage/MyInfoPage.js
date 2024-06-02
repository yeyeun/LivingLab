import MyInfoComponent from '../../components/myPage/MyInfoComponent';
import BasicLayout from '../../layouts/BasicLayout';
import SideBar from '../../layouts/SideBar';

const MyInfoPage = () => {
  return (
    <div>
      <BasicLayout>
        <div className="flex flex-wrap mb-5 w-full h-full items-center">
          <SideBar />
          <MyInfoComponent />
        </div>
      </BasicLayout>
    </div>
  );
};

export default MyInfoPage;
