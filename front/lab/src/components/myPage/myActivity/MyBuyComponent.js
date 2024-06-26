import React, { useEffect, useState } from 'react';
import { myList } from '../../../api/buyApi';
import { useNavigate } from 'react-router-dom';


const MyBuyComponent = ({id}) => {
  const [serverData, setServerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    myList(id).then((data) => {
      setServerData(data);
    });
  }, [id]);

  const moveToRead = (no) => {
    navigate(`/buy/read/${no}`);
  }

  const moveToList = () => {
    navigate('/myPage/activity/buy');
  }

  return (
      <div className="w-1/2 h-72 m-4">
        <div className="p-6 h-full overflow-hidden bg-white rounded-lg border shadow-md">
          <div className="flex justify-between items-center ml-2 mb-6">
            <h3 className="text-xl font-bold leading-none text-gray-900">공동구매</h3>
            <span className="text-base font-semibold text-gray-500 cursor-pointer" onClick={()=>moveToList()}>
              더보기
            </span>
          </div>
            <ul className="divide-y divide-gray-200 h-full">
              {serverData.length > 0 ? (
                serverData.map((buy) => (
                  <li className="py-4 hover:bg-slate-100 cursor-pointer" onClick={()=>moveToRead(buy.no)}>
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 text-center">
                      <span className="text-sm text-white truncate bg-gray-500 rounded px-2 mr-2">
                      {buy.category === '1' && '배달음식'}
                      {buy.category === '2' && '생필품'}
                      {buy.category === '3' && '식료품'}
                      {buy.category === '4' && '가구/가전'}
                      {buy.category === '5' && '기타'}
                      </span>
                    </div>
                    <div className="col-span-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                      <span className="text-base font-semibold text-gray-900">
                        {buy.title}
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="text-sm text-gray-900 mr-1">
                      {buy.regDate}
                      </span>
                    </div>
                  </div>
                 </li>
                ))
              ) 
              : 
              (
                <li className="py-4">
                <div className="grid grid-cols-4">
                  <div className="col-span-4 text-center text-base">
                      작성한 게시물이 없습니다
                  </div>
                </div>
               </li>
              )}
            </ul>

        </div>
      </div>
  );
};
export default MyBuyComponent;
