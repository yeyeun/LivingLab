import MyChatComponent from '../../components/myPage/MyChatComponent';
import BasicLayout from '../../layouts/BasicLayout';
import SideBar from '../../layouts/SideBar';

const myChatPage = () => {
  return (
    <div>
      <BasicLayout>
        <div className="flex flex-wrap w-full h-full items-center">
          <SideBar />
          <MyChatComponent />
        </div>
      </BasicLayout>
    </div>
  );
};

export default myChatPage;
