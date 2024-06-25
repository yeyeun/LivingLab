import React, { useEffect, useState } from 'react';
import { myList } from '../../../api/communityApi';
import { useNavigate } from 'react-router-dom';


const MyCommunityComponent = ({id}) => {
  const [serverData, setServerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    myList(id).then((data) => {
      setServerData(data);
    });
  }, [id]);

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

  const moveToList = () => {
    navigate('/myPage/activity/community');
  }

  return (
      <div className="w-1/2 h-72 m-4">
        <div className="p-6 h-full overflow-hidden bg-white rounded-lg border shadow-md">
          <div className="flex justify-between items-center ml-2 mb-6">
            <h3 className="text-xl font-bold leading-none text-gray-900">커뮤니티</h3>
            <span className="text-base font-semibold text-gray-500 cursor-pointer" onClick={()=>moveToList()}>
              더보기
            </span>
          </div>
            <ul className="divide-y divide-gray-200 h-full">
              {serverData.length > 0 ? (
                serverData.map((comm) => (
                  <li className="py-4 hover:bg-slate-100 cursor-pointer" onClick={()=>moveToRead(comm.no, comm.category)}>
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 text-center">
                      <span className="text-sm text-white truncate bg-gray-500 rounded px-2 mr-2">
                      {comm.category === '1' && '자취TIP'}
                      {comm.category === '2' && '질문'}
                      {comm.category === '3' && '리뷰'}
                      {comm.category === '4' && '도움요청'}
                      </span>
                    </div>
                    <div className="col-span-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                      <span className="text-base font-semibold text-gray-900">
                        {comm.title}
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="text-sm text-gray-900 mr-1">
                      {comm.regDate}
                      </span>
                    </div>
                  </div>
                 </li>
                ))
              ) 
              : 
              (
                <div>작성한 게시글이 없습니다</div>
              )}
            </ul>

        </div>
      </div>
  );
};
export default MyCommunityComponent;
