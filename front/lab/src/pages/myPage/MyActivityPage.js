import MyActivityComponent from '../../components/myPage/MyActivityComponent';
import BasicLayout from '../../layouts/BasicLayout';
import SideBar from '../../layouts/SideBar';

const MyActivityPage = () => {
  return (
    <div>
      <BasicLayout>
        <div className="flex flex-wrap w-full h-full items-center">
          <SideBar />
          <MyActivityComponent />
        </div>
      </BasicLayout>
    </div>
  );
};

export default MyActivityPage;
