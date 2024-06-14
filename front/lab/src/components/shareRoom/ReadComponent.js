
import React, { useEffect, useState } from "react"
import { API_SERVER_HOST, getOne, deleteOne } from "../../api/shareRoomApi"
import useRoomCustomMove from "../../hooks/useRoomCustomMove"
import { useSelector } from 'react-redux';

const host = API_SERVER_HOST;

const initState = {
    roomNo: 0,
    title: '',
    rentFee: 0,
    parking: '',
    option1: '',
    location: '',
    uploadFileNames: []
}

const ReadComponent = ({ roomNo }) => {
    const [shareRoom, setShareRoom] = useState(initState)
    const { moveToModify, moveToList } = useRoomCustomMove()
    const [result, setResult] = useState(null)
    const loginState = useSelector((state) => state.loginSlice);

    useEffect(() => {
        getOne(roomNo).then(data => {
            console.log(data)
            setShareRoom(data)
        })
    }, [roomNo])



    const handleClickDelete = () => {

        deleteOne(roomNo).then(result => {
            console.log("delete result : " + result)
            setResult('Deleted')
            moveToList()
        })

    }

    return (
        <div id="full-main">
            <div id="wrap" className="pt-10 w-full text-center mx-auto  ">
                <div id="images" className="w-[1200px] p-2.5 mx-auto">
                    <div id="grid" className="grid grid-cols-custom grid-rows-2 gap-2 w-full h-[440px]">
                        {shareRoom.uploadFileNames.map((imgFile, index) => (
                            <React.Fragment key={index}>
                                {index === 0 ? (
                                    <div id={`child-first-${index}`} className="row-span-2 relative overflow-hidden">
                                        <img src={`${host}/api/shareRoom/display/${imgFile}`} className="position-absolute object-cover w-full h-full"></img>
                                    </div>
                                ) : (
                                    <>
                                        <div id={`child-${index}`} className="relative overflow-hidden">
                                            <img src={`${host}/api/shareRoom/display/${imgFile}`} className="position-absolute object-cover w-full h-full"></img>
                                        </div>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <div id="text-main" className=" pt-24 pb-32">
                <div id="grid2" className="w-[1200px] mx-auto grid grid-cols-[780px_360px] gap-x-10 gap-y-0 p-2.5">
                    <div id="text-area" className="w-[780px] h-[1000px] col-span-1 ">
                        <div id="box" className="flex items-center mb-10 p-8 border border-gray-200 rounded-sm bg-gray-50">
                            <h1 className="flex-none ml-1 text-black text-base leading-6 font-bold"> 이것은 제목 입니다. </h1>
                        </div>
                        <div id="main-container" className="grid gap-y-28">
                            <section id="price">
                                <div id="price-info" className="flex items-start mb-8">
                                    <h1 className="text-black text-2xl leading-tight tracking-tighter font-bold">가격정보</h1>
                                </div>
                                <ul>
                                    <li className="grid grid-cols-[160px_minmax(0,1fr)] gap-x-4 pb-4">
                                        <div>
                                            <h1 className="text-gray-900 text-base leading-6 font-bold">비용</h1>
                                        </div>
                                        <div>
                                            <p className="text-base leading-6 font-medium">5만원 / 주</p>
                                        </div>
                                    </li>
                                    <li className="border-t border-gray-200 grid grid-cols-[160px_minmax(0,1fr)] gap-x-4 py-4">
                                        <div>
                                            <h1 className="text-gray-900 text-base leading-6 font-bold">주차가능여부</h1>
                                        </div>
                                        <div>
                                            <p className="text-base leading-6 font-medium">O</p>
                                        </div>
                                    </li>
                                    <li className="border-t border-gray-200 grid grid-cols-[160px_minmax(0,1fr)] gap-x-4 py-4">
                                        <div>
                                            <h1 className="text-gray-900 text-base leading-6 font-bold">주소</h1>
                                        </div>
                                        <div>
                                            <p className="text-base leading-6 font-medium">경기도 성남시 분당구 판교로 225번길 38</p>
                                        </div>
                                    </li>
                                    <li className="border-t border-gray-200 grid grid-cols-[160px_minmax(0,1fr)] gap-x-4 py-4">
                                        <div>
                                            <h1 className="text-gray-900 text-base leading-6 font-bold">시작일</h1>
                                        </div>
                                        <div>
                                            <p className="text-base leading-6 font-medium">2024년 6월 4일</p>
                                        </div>
                                    </li>                                    
                                    <li className="border-t border-gray-200 grid grid-cols-[160px_minmax(0,1fr)] gap-x-4 py-4">
                                        <div>
                                            <h1 className="text-gray-900 text-base leading-6 font-bold">종료일</h1>
                                        </div>
                                        <div>
                                            <p className="text-base leading-6 font-medium">2024년 6월 29일</p>
                                        </div>
                                    </li>
                                    <li className="border-t border-gray-200 grid grid-cols-[160px_minmax(0,1fr)] gap-x-4 py-4">
                                        <div>
                                            <h1 className="text-gray-900 text-base leading-6 font-bold">옵션</h1>
                                        </div>
                                        <div>
                                            <p className="text-base leading-6 font-medium">세탁기,냉장고,티비,벽걸이 에어컨,도시가스</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                            <section id="location">
                                <div id="location-info" className="flex items-start mb-8">
                                    <h1 className="text-black text-2xl leading-tight tracking-tighter font-bold">위치</h1>
                                </div>
                                <div id="loc-title" className="mb-6">
                                    <p className="flex-none mr-4 text-gray-900 text-base leading-6 font-normal">주소가 어쩌구 저쩌구</p>
                                </div>
                                <div id="zeedo">

                                </div>
                            </section>
                        </div>
                    </div>
                    <aside id="info-area" className="w-[360px] col-span-1">
                        <div id="content-container" className="sticky top-24">
                            <div id="inner-content" className="w-90 p-8 bg-white shadow-md border border-gray-300 rounded-sm relative">
                                <p className="flex-none text-gray-900 text-base leading-6 font-normal">
                                
                                
                                안녕하세요

                                이름은 코어빌이고 위치는 판교 쪽에 있습니다.

                                위치가 약간 먼데 어자피 요번에 새로 지은 의료과학대 덕분에 그렇게 먼 것은 아닌것 같습니다.

                                방이 상당히 넓고 두명이서 지내도 괜찮을 정도입니다.

                                한가지 장점이라면 도시가스가 들어온다는 겂니다.

                                가격은 1주일에 5만원이구요

                                에어콘, 세탁기, 냉장고,티비 등은 기본으로 제공한다고 합니다.

                                전체적으로는 많이 깔끔한 편입니다.

                                인테리어 벽지도 방마다 다르게 해서 뭐랄까 방만큼은 상당히 괜찮습니다.



                                </p>
                                <div id="buttons" className="flex items-center w-full mt-8">
                                    <div>
                                        <button className="inline-flex items-center justify-center w-[211px] px-4 text-white bg-blue-600 h-[56px] text-sm leading-6 font-bold rounded-sm cursor-pointer transition-all duration-150 ease-out">
                                            <span className="">문의하기</span>
                                        </button>
                                    </div>
                                    <div className="w-[77px] ml-2">
                                        <button className="h-[56px]">
                                            <span>좋아요</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;