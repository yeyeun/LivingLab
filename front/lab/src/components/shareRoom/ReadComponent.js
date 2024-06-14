
import React,{ useEffect, useState } from "react"
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
            <div id="wrap" className="pt-10 w-full text-center mx-auto bg-yellow-200 ">
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
            <div id="text-main" className="bg-green-300 pt-24 pb-32">
                <div id="grid2" className="w-[1200px] mx-auto grid grid-cols-[780px_360px] gap-x-10 gap-y-0 p-2.5">
                    <div id="text-area" className="w-[780px] h-[1000px] col-span-1 bg-blue-200">
                        <div id="box" className="flex items-center mb-10 p-8 border border-gray-200 rounded-sm bg-gray-50">
                            <h1 className="flex-none ml-1 text-black text-base leading-6 font-bold"> 이것은 제목 입니다. </h1>
                        </div>
                        <div id="main-container">
                            <section id="price">
                                <div id="price-info" className="flex items-start mb-8">
                                    <h1 className="text-black text-2xl leading-tight tracking-tighter font-bold">가격정보</h1>
                                </div>
                                <ul>
                                    <li className="grid grid-cols-[160px_minmax(0,1fr)] gap-x-4 p-y-4"></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </section>
                        </div>
                    </div>
                    <aside id="info-area" className="w-[360px] col-span-1 bg-red-200">

                    </aside>
                </div>    
            </div>
        </div>    
    );
}

export default ReadComponent;