import { useRef, useState, useEffect } from "react";
import { modify,getOne } from "../../api/shareRoomApi";
import ResultModal from "../common/ResultModal";
import useRoomCustomMove from "../../hooks/useRoomCustomMove";


const initState = {
    roomNo: 0,
    title: '',
    content: '',
    rentFee: 0,
    parking: '',
    option1: '',
    location: '',
    files: []
}//

const ModifyComponent = ({ roomNo }) => {
    const [shareRoom, setShareRoom] = useState(initState)
    const [result, setResult] = useState(null)
    const [addResultModal, setAddResultModal] = useState(null);
    const { moveToRead } = useRoomCustomMove();
    const uploadRef = useRef();

    useEffect(() => {
        getOne(roomNo).then(data => {
            console.log(data)
            console.log(roomNo)
            setShareRoom(data)
        })
    }, [roomNo])

    const handleChangeShareRoom = (e) => {
        shareRoom[e.target.name] = e.target.value
        setShareRoom({ ...shareRoom })
    }
    const handleClickModify = (e) => {
        //유효성 검사
        if (!shareRoom.title || !shareRoom.userId) {
            setAddResultModal("제목과 내용을 입력해주세요");
            return;

        }
        const files = uploadRef.current.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        //파일이 아닌 데이터를 formData에 추가
        formData.append("userId", shareRoom.userId);
        formData.append("title", shareRoom.title);
        formData.append("content", shareRoom.content);
        formData.append("rentFee", shareRoom.rentFee);
        formData.append("parking", shareRoom.parking);
        formData.append("option1", shareRoom.option1);

        modify(formData);
        setResult("게시글이 수정되었습니다");
    }

    const closeModal = () => {
        setResult(null);
        //moveToRead();
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {result ? <ResultModal title={'알림'} content={`${result}`}
                callbackFn={closeModal} /> : <></>}
            {addResultModal ? (
                <ResultModal title={'알림'} content={`${addResultModal}`}
                    callbackFn={() => setAddResultModal(null)} />
            ) : <></>}
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
            <div className="col-span-3">
                <label for="about" className="block text-sm font-medium leading-6 text-gray-900">사진 업로드</label>
                <div className="mt-2">
                    <input ref={uploadRef} type={'file'} multiple={true} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-slate-700 hover:file:bg-violet-100"/>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white" onClick={handleClickModify}>
                        Modify
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ModifyComponent;