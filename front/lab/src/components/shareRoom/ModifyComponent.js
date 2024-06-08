import { useState } from "react";
import { postAdd } from "../../api/shareRoomApi";

const initState = {
    roomNo: 0,
    title: '',
    rentFee: 0,
    parking: '',
    option1: '',
    location: ''
}//

const ModifyComponent = ({roomNo}) => {
    const [shareRoom, setShareRoom] = useState(initState)
    const [result, setResult] = useState(null)
    const handleChangeShareRoom = (e) => {
        shareRoom[e.target.name] = e.target.value
        setShareRoom({ ...shareRoom })
    }
    const handleClickModify = () => {
        putOne(shareRoom).then(result => {
            console.log("modify result : " +result)
            setResult('Modified')
        })
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="title" type={'text'} value={shareRoom.title} onChange={handleChangeShareRoom}>

                        </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">userId</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="userId" type={'text'} value={shareRoom.userId} onChange={handleChangeShareRoom}>

                        </input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                        onClick={handleClickModify}>Modify</button>
                </div>
            </div>
        </div>
    );
}
export default ModifyComponent;