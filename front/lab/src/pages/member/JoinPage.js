import JoinComponent from '../../components/member/JoinComponent';
import BasicMenu from '../../components/menus/BasicMenu';
import BasicLayout from '../../layouts/BasicLayout';

const JoinPage = () => {
  return (
    <div>
      <BasicLayout>
        <div className="flex flex-wrap mb-10 w-full h-full justify-center items-center">
          <JoinComponent />
        </div>
      </BasicLayout>
    </div>
  );
};

export default JoinPage;
