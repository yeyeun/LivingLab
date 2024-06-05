import image from '../../resources/images/room.jpg';
import { useEffect, useState } from "react";
import { getList } from "../../api/shareRoomApi"
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";
import SearchComponent from '../../components/common/SearchComponent';

import SelectComponent from '../../components/common/SelectComponent';


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
  current: 0
}

const ListComponent = () => {
  const { page, size, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  useEffect(() => {
    getList({ page, size }).then(data => {
      console.log(data);
      setServerData(data);
    })
  }, [page, size]);
  return (

    <>
    <div className='h-1/2 items-center'>
      <SearchComponent/>
    </div>
    {/* <div className='pl-12'>  
      <SelectComponent/>
    </div>   */}
    <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 py-10 max-w-7xl items-center mx-auto">
      {serverData.dtoList.map((shareRoom) =>
        <div class="mx-12 overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80">
          <div className="block w-full h-full" onClick={() => moveToRead(shareRoom.roomNo)}>
            <img alt="..." src={image} class="object-cover w-full max-h-40" />
            <div class="w-full p-4 bg-white">
              <p class="font-medium text-indigo-500 text-md">
              </p>
              <p class="mb-2 text-xl font-medium text-gray-800">
                {shareRoom.title}
              </p>
              <p class="font-light text-gray-400 text-md">
                {shareRoom.rentFee}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </>
  );
}

export default ListComponent;