import { useRef,useState } from "react";
import { postAdd } from "../../api/shareRoomApi";
import useRoomCustomMove from "../../hooks/useRoomCustomMove";

const initState = {
    roomNo: 0,
    title: '',
    rentFee: 0,
    parking: '',
    option1: '',
    location: ''
}

const AddComponent = () => {
    const [shareRoom, setShareRoom] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const { moveToList } = useRoomCustomMove()
    const uploadRef = useRef();
    const handleChangeShareRoom = (e) => {
        shareRoom[e.target.name] = e.target.value 
        setShareRoom({ ...shareRoom })
    }

    const handleClickAdd = () => {
        const files = uploadRef.current.files;

        console.log(shareRoom)
        postAdd(shareRoom).then(result => {
            setResult(result.ROOMNO);
            setShareRoom({ ...initState })
            moveToList()
        }).catch(e => {
            console.error(e)
        })
    }


    return (
        
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <h1>add페이지입니다</h1>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="title" type={'text'} value={shareRoom.title} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">userId</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="userId" type={'text'} value={shareRoom.userId} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="col-span-3">
                <label for="about" className="block text-sm font-medium leading-6 text-gray-900">사진 업로드</label>
                <div className="mt-2">
                    <input ref={uploadRef} type={'file'} multiple={true} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-slate-700 hover:file:bg-violet-100"/>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                        onClick={handleClickAdd}>ADD</button>
                </div>
            </div>
        </div>
    );
}
export default AddComponent;