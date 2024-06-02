import MyInfoModifyComponent from '../../components/myPage/MyInfoModifyComponent';
import BasicLayout from '../../layouts/BasicLayout';
import SideBar from '../../layouts/SideBar';

const MyInfoModifyPage = () => {
  return (
    <div>
      <BasicLayout>
        <div className="flex flex-wrap mb-5 w-full h-full items-center">
          <SideBar />
          <MyInfoModifyComponent />
        </div>
      </BasicLayout>
    </div>
  );
};

export default MyInfoModifyPage;
