import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListComponent from "../../../components/community/help/ListComponent";
import useCustomHelp from "../../../hooks/useCustomHelp";
import ResultModal from '../../../components/common/ResultModal';


const ListPage = () => {
  const { moveToAdd } = useCustomHelp();
  const [addResultModal, setAddResultModal] = useState(null);
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보

  // ? 사용: loginInfo가 null/undefined일때도 오류없이 처리
  const email = loginInfo?.email;

  const handleClickWrite = (e) => {
    if (!email) {
      setAddResultModal("로그인 후 이용할 수 있습니다");
    } else {
      moveToAdd();
    }
  };

  const handleModalClose = () => {
    setAddResultModal(null);
    navigate('/user/login'); // 로그인 페이지로 이동
  };


  return (
    <div className="text-xl flex-grow">
      <div className="m-auto bg-white w-5/6 rounded-md py-16">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300">도움요청</div>
                <ListComponent />
                <button
                  type="button"
                  className="float-right inline-block rounded bg-teal-400 px-6 pb-2 pt-2.5 text-base font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-teal-500 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-teal-600 motion-reduce:transition-none"
                  onClick={handleClickWrite}>
                  글쓰기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addResultModal && (
        <ResultModal title={'알림'} content={addResultModal} callbackFn={handleModalClose} />
      )}
    </div>
  );
};

export default ListPage;
