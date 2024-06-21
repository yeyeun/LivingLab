import { useEffect, useState } from "react";
import { API_SERVER_HOST, getList } from "../../api/shareRoomApi"
import useRoomCustomMove from "../../hooks/useRoomCustomMove";
import PageComponent from "../common/PageComponent";
import LandingComponent from  "../common/mapSearch/LandingComponent";



const host = API_SERVER_HOST;
const initState = {
  dtoList: [], //한 페이지에 불러오는 게시물 갯수
  pageNumList: [],
  roomPageRequestDto: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = ({ search, sort }) => {
  const { page, size, moveToList, moveToRead } = useRoomCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size },search, sort).then(data => {
      const updatedData = {
        ...data,
        dtoList: data.dtoList.map((shareRoom) => ({
          ...shareRoom,
          // recruit: checkDeadline(buy.deadline),
        })),
      };
      setServerData(updatedData);
    })
  }, [page, size ,search, sort]);


  return (
    <>
      <div className=' '>
      </div>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 py-10 max-w-7xl min-w-[1280px] items-center mx-auto">
        {serverData.dtoList.map((shareRoom) => (
          <div class="mx-12 overflow-hidden rounded-sm shadow-lg cursor-pointer h-90 w-60 md:w-80">
            <div className="relative w-full h-full group" onClick={() => moveToRead(shareRoom.roomNo)}>
              <img alt="..." src={`${host}/api/shareRoom/display/${shareRoom.uploadFileNames[0]}`}
              class="object-cover w-full max-h-40 transition duration-500 group-hover:blur-xl group-hover:brightness-120"/>
                <div className="absolute top-0 w-full flex flex-col items-center justify-center px-4 group-hover:z-10">
                <p class="text-gray-900 text-lg leading-5 font-bold mb-2 hidden group-hover:block rounded px-2 pt-6">
                    {shareRoom.title}
                  </p>
                  <p class="text-gray-900 text-sm leading-5 font-medium mb-2 hidden group-hover:block rounded px-2 pt-10">
                    옵션 : {shareRoom.option1}
                  </p>
                </div>
              <div class="w-full p-4 bg-white">
                <p class="text-gray-900 text-sm leading-5 font-normal mb-1">
                  {shareRoom.location}
                </p>
                <div className="flex">
                  <p class=" mb-2 text-xl font-medium text-blue-500">
                    {shareRoom.averFee.toLocaleString()}원/박
                  </p>
                  <p class="ml-10 mb-2 text-xl font-medium text-gray-800">
                    총&nbsp; {parseInt(shareRoom.rentFee).toLocaleString()}원
                  </p>
                </div>
                <div className="flex">
                  <div className="">
                    <p class="text-gray-500 text-sm leading-6 font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {shareRoom.rentStartDate} &nbsp; 부터
                    </p>
                    <p class="text-gray-500 text-sm leading-6 font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {shareRoom.rentEndDate} &nbsp; 까지
                    </p>
                  </div>
                  <div className="w-full ml-16 mt-3">
                    <p class="text-gray-500 text-xl leading-6 whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold">
                      {shareRoom.days} &nbsp; 일 &nbsp;동안
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end p-4">
        </div>
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </>
  );
};

export default ListComponent;
