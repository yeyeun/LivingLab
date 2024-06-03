import MyChatComponent from '../../../components/myPage/MyChatComponent';
import BasicLayout from '../../../layouts/BasicLayout';

const myChatPage = () => {
  return (
    <div>
      <div className="flex flex-wrap w-full h-full items-center">
        <MyChatComponent />
      </div>
    </div>
  );
};

export default myChatPage;
