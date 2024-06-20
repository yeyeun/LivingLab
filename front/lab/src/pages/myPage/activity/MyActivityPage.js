import MyActivityComponent from '../../../components/myPage/myActivity/MyActivityComponent';
import { useParams } from 'react-router-dom';

const MyActivityPage = () => {
  const { id } = useParams();

  return (
    <div className="text-xl flex-grow">
      <div className="bg-white w-full rounded-md px-10 py-4 min-h-full">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-2xl pl-2 my-2 border-l-4 font-Jua border-teal-300">나의 활동</div>

                <MyActivityComponent id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivityPage;
