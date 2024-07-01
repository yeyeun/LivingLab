import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCustomMyPage from '../../../hooks/useCustomMyPage';
import { myListAll } from '../../../api/communityApi';
import PageComponent from '../../../components/common/PageComponent';
import flagIcon from "../../../resources/images/flagIcon.png"
import fullheart from "../../../resources/images/heart_full.png";

const initState = {
  dtoList: [], // 한 페이지에 불러오는 게시물 갯수
  pageNumList: [],
  pageRequestDto: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};


const MyCommunityListPage = () => {
  const { page, size, moveToCommunityList } = useCustomMyPage();
  const [serverData, setServerData] = useState(initState);
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.loginSlice);
  const id = loginInfo.id;

  useEffect(() => {
    myListAll({ page, size }, id).then(data => {
      setServerData(data);
    })
  }, [page, size, id]);

  const moveToRead = (no,category) => {
    const paths = {
      '1' : `/community/tip/read/${no}`,
      '2' : `/community/qna/read/${no}`,
      '3' : `/community/review/read/${no}`,
      '4' : `/community/help/read/${no}`
    };

    const path = paths[category] || '/community/tip/list';
    navigate(path);
  }


  return (
    <div className="text-xl flex-col h-fit flex w-4/5">
      <div className="bg-white w-full rounded px-10 py-4 h-full shadow-md">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-2xl pl-2 my-2 border-l-4 font-Jua border-teal-300">나의 활동</div>
                <div className="flex h-full justify-center">
                  <div className="w-full m-4">
                    <div className="p-6 h-full overflow-hidden bg-white rounded-lg border shadow">
                      <div className="flex justify-between items-center ml-2 mt-0.5">
                        <h3 className="text-xl font-bold leading-none text-gray-900">커뮤니티</h3>
                      </div>
                      <hr className="my-4" />
                      <table className="min-w-full text-center text-lg font-light text-surface">
                        <thead className="text-sm border-b-2 border-neutral-500 font-semibold">
                          <tr>
                            <th scope="col" className="w-3/12 py-4">카테고리</th>
                            <th scope="col" className="w-1/12 py-4"><img src={fullheart} className="w-4 mx-auto" alt="heart" /></th>
                            <th scope="col" className="w-6/12 py-4">제목</th>
                            <th scope="col" className="w-2/12 py-4">작성일</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serverData.dtoList.length > 0 ? (
                            serverData.dtoList.map(comm =>
                              <tr
                                className="text-base border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 hover:cursor-pointer"
                                onClick={() => moveToRead(comm.commNo, comm.type)}>
                                <td className="whitespace-nowrap py-4">
                                  {comm.type === '1' && '자취TIP'}
                                  {comm.type === '2' && '질문게시판'}
                                  {comm.type === '3' && '리뷰게시판'}
                                  {comm.type === '4' && '도움요청'}
                                  /
                                  {comm.commCategory === '1' && '부동산'}
                                  {comm.commCategory === '2' && '인테리어'}
                                  {comm.commCategory === '3' && '할인정보'}
                                  {comm.commCategory === '4' && '기타'}
                                </td>
                                <td className="whitespace-nowrap py-4">{comm.commHit}</td>
                                <td className="whitespace-nowrap py-4">
                                  {comm.title}
                                  {comm.flag && (
                                    <img src={flagIcon} alt="Flag Icon" className="inline-block ml-2 w-5 h-5" />
                                  )}
                                </td>
                                <td className="whitespace-nowrap py-4">{comm.regDate}</td>
                              </tr>
                            ))
                            :
                            (
                              <tr>
                                <td colSpan="5" className="py-4">
                                  작성한 게시물이 없습니다
                                </td>
                              </tr>
                            )}
                        </tbody>
                      </table>



                      <PageComponent serverData={serverData} movePage={moveToCommunityList} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCommunityListPage;