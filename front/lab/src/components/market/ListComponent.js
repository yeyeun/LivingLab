import userIcon from '../../resources/images/user.png';
import mapIcon from '../../resources/images/map.png';
import { useEffect, useState } from 'react';
import { API_SERVER_HOST, getList } from '../../api/marketApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';

const initState = {
  dtoList: [], //한 페이지에 불러오는 게시물 갯수
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

const host = API_SERVER_HOST;

const ListComponent = ({ search, sort }) => {
  const { page, size, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  const checkDeadline = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    return currentDate > deadlineDate ? '모집 종료' : '모집 중';
  };

  useEffect(() => {
    getList({ page, size }, search, sort).then((data) => {
      const updatedData = {
        ...data,
        dtoList: data.dtoList.map((buy) => ({
          ...buy,
          recruit: checkDeadline(buy.deadline),
        })),
      };
      setServerData(updatedData);
    });
  }, [page, size, search, sort]);

  return (
    <div>
      {serverData.dtoList.map((market) => (
        <div key={market.marketNo} className="w-full mb-4" onClick={() => moveToRead(market.marketNo)}>
          <div className="flex flex-col items-center px-5 bg-white border border-gray-200 rounded-lg shadow sm:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none" src={`${host}/api/market/display/${market.uploadFileNames[0]}`} alt="..." />
            <div className="flex flex-col p-4 mx-5 leading-normal">
              <div className="mb-2 inline-flex">
                <span className="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-xl border border-gray-900 dark:bg-gray-700 dark:text-gray-300">
                  {market.marketCategory === '1' && '구매'}
                  {market.marketCategory === '2' && '판매'}
                  {market.marketCategory === '3' && '교환'}
                  {market.marketCategory === '4' && '나눔'}
                </span>
                <div className="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-xl border border-gray-900 dark:bg-gray-700 dark:text-gray-300">
                  <img src={userIcon} alt="..." className="w-3 inline" />
                  &ensp;{market.current} / {market.max}
                </div>
                <div className="text-base">진행 중</div>
              </div>
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{market.title}</h5>
              <div className="mb-3 text-base text-gray-700 dark:text-gray-400">
                <img src={mapIcon} alt="..." className="w-3 inline" />
                &ensp;{market.location}
              </div>
              <div className="mb-3 text-base text-gray-700 dark:text-gray-400">
                <div className="float-right">{market.user_id}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default ListComponent;
