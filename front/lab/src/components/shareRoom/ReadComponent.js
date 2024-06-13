
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
    );
}

export default ReadComponent;