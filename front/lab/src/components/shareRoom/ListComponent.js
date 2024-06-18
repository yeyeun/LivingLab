import { useEffect, useState } from "react";
import { API_SERVER_HOST, getList } from "../../api/shareRoomApi"
import useRoomCustomMove from "../../hooks/useRoomCustomMove";
import PageComponent from "../common/PageComponent";
import { useSelector } from 'react-redux';



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
  current: 0
}

const ListComponent = ({ search }) => {
  const { page, size, moveToList, moveToRead, moveToAdd } = useRoomCustomMove();
  const [serverData, setServerData] = useState(initState);
  const loginState = useSelector((state) => state.loginSlice);

  useEffect(() => {
    getList({ page, size },search).then(data => {
      console.log(data);
      setServerData(data);
    })
  }, [page, size ,search]);


  return (
    <>
      <div className=' '>
      {!loginState.id ? (
            <>

            </>
          ) : (
            <div className="max-w-7xl min-w-[1280px]">
              <button type="button" class="float-right inline-block rounded bg-teal-400 px-6 pb-2 pt-2.5 text-base font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-teal-500 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-teal-600 motion-reduce:transition-none" onClick={() => moveToAdd()}>글쓰기</button>
            </div>
          )}
      </div>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 py-10 max-w-7xl min-w-[1280px] items-center mx-auto">
        {serverData.dtoList.map((shareRoom) => (
          <div class="mx-12 overflow-hidden rounded-sm shadow-lg cursor-pointer h-90 w-60 md:w-80">
            <div className="block w-full h-full" onClick={() => moveToRead(shareRoom.roomNo)}>
              <img alt="..." src={`${host}/api/shareRoom/display/${shareRoom.uploadFileNames[0]}`} class="object-cover w-full max-h-40" />
              <div class="w-full p-4 bg-white">
                <p class="text-gray-900 text-xs leading-5 font-normal mb-1">
                  {shareRoom.location}
                </p>
                <div className="flex">
                  <p class=" mb-2 text-xl font-medium text-blue-500"> 1박 &nbsp;{(shareRoom.averFee / 10000).toFixed(1)} &nbsp;만원</p>
                  {(shareRoom.rentFee % 10000) === 0 ? (
                  <p class="ml-10 mb-2 text-xl font-medium text-gray-800">
                    총 &nbsp; {(shareRoom.rentFee / 10000).toFixed(0)} &nbsp; 만원
                  </p>
                  ) : (
                  <p class="ml-10 mb-2 text-xl font-medium text-gray-800">
                    총 &nbsp; {(shareRoom.rentFee / 10000).toFixed(1)} &nbsp; 만원
                  </p>
                  )}
                  
                </div>
                
                <p class="text-gray-900 text-xs leading-5 font-normal">
                  {shareRoom.option1}
                </p>
                <p class="text-gray-500 text-sm leading-6 font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {shareRoom.rentStartDate} &nbsp; 부터
                </p>
                <p class="text-gray-500 text-sm leading-6 font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {shareRoom.rentEndDate} &nbsp; 까지
                </p>
                <p class="text-gray-500 text-sm leading-6 font-normal whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {shareRoom.days} &nbsp; 일 &nbsp;동안
                </p>
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
}

export default ListComponent;