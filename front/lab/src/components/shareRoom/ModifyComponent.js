import React, { useRef, useState, useEffect } from "react";
import { modify, getOne } from "../../api/shareRoomApi";
import ResultModal from "../common/ResultModal";
import useRoomCustomMove from "../../hooks/useRoomCustomMove";
import PostComponent from "../common/PostComponent";


const initState = {
    roomNo: 0,
    title: '',
    content: '',
    rentFee: 0,
    parking: '',
    option1: '',
    location: '',
    files: [],
    uploadFileNames: []
}//

const ModifyComponent = ({ roomNo }) => {
    const [shareRoom, setShareRoom] = useState(initState)
    const [result, setResult] = useState(null)
    const [addResultModal, setAddResultModal] = useState(null);
    const [previewFiles, setPreviewFiles] = useState([]);
    const { moveToRead } = useRoomCustomMove();
    const uploadRef = useRef();
    const [address, setAddress] = React.useState('');
    const [popup, setPopup] = React.useState(false);

    useEffect(() => {
        getOne(roomNo).then(data => {
            console.log(data)
            console.log(roomNo)
            setShareRoom(data)
        })
    }, [roomNo])

    const handleChangeShareRoom = (e) => {
        shareRoom[e.target.name] = e.target.value
        setShareRoom({ ...shareRoom });
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const nonImageFiles = files.filter(file => !file.type.startsWith('image/'));

        if (nonImageFiles.length > 0) {
            setAddResultModal("이미지 파일만 등록 가능합니다");
            uploadRef.current.value = ""; // Clear the file input
            setPreviewFiles([]);
            return;
        }

        const imagePreviews = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));

        setPreviewFiles(imagePreviews);
    }

    const handleClickModify = (e) => {

        //유효성 검사
        if (!shareRoom.title || !shareRoom.userId) {
            setAddResultModal("제목과 내용을 입력해주세요");
            return;
        }
        const files = uploadRef.current.files;
        const formData = new FormData();

        const combinedAddress = `${address} ${document.querySelector('[name="detailAddr"]').value}`;
        formData.append("location", combinedAddress);

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        //파일이 아닌 데이터를 formData에 추가
        formData.append("title", shareRoom.title);
        formData.append("content", shareRoom.content);
        formData.append("rentFee", shareRoom.rentFee);
        formData.append("parking", shareRoom.parking);
        formData.append("option1", shareRoom.option1);
        formData.append("rentStartDate", shareRoom.rentStartDate);
        formData.append("rentEndDate", shareRoom.rentEndDate);
        formData.append("uploadFileNames", shareRoom.uploadFileNames);

        console.log(formData);
        modify(roomNo, formData);
        setResult("게시글이 수정되었습니다");
    }

    const closeModal = () => {
        setResult(null);
        moveToRead(roomNo);
    }

    return (
        <div className="border-2 max-w-[750px]  mx-auto border-sky-200 mt-10 m-2 p-4">
            {result ? <ResultModal title={'알림'} content={`${result}`}
                callbackFn={closeModal} /> : <></>}
            {addResultModal ? (
                <ResultModal title={'알림'} content={`${addResultModal}`}
                    callbackFn={() => setAddResultModal(null)} />
            ) : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">제목</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="title" type={'text'} value={shareRoom.title} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">내용</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="content" type={'text'} value={shareRoom.content} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">월세</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="rentFee" type={'number'} value={shareRoom.rentFee} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">옵션</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="option1" type={'text'} value={shareRoom.option1} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">주차가능여부</div>
                    <input className=""
                        name="parking" type={'radio'} value="O" checked={shareRoom.parking === 'O'} onChange={handleChangeShareRoom}>
                    </input>
                    <div className="pl-3 pr-5">가능</div>
                    <input className=""
                        name="parking" type={'radio'} value="X" checked={shareRoom.parking === 'X'} onChange={handleChangeShareRoom}>
                    </input>
                    <div className="pl-3">불가능</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">임대 시작일</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="option1" type={'date'} value={shareRoom.rentStartDate} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">임대 종료일</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="option1" type={'date'} value={shareRoom.rentEndDate} onChange={handleChangeShareRoom}></input>
                </div>
            </div>
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-full p-3 text-left font-bold">주소</div>
                <button
                    className="rounded p-2 w-1/4 bg-gray-500 text-xm text-white"
                    onClick={() => {
                        setPopup(!popup);
                    }}
                >
                    🔍︎ 주소 검색
                </button>
                {popup && <PostComponent address={address} setAddress={setAddress}></PostComponent>}
                <input
                    className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                    name="addr"
                    type={'text'}
                    placeholder="주소"
                    required={true}
                    value={address}
                ></input>
                <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md" name="detailAddr" type={'text'} placeholder="상세주소를 입력해주세요"></input>
            </div>
            <div className="col-span-3">
                <label htmlFor="fileUpload" className="block text-sm font-medium leading-6 text-gray-900">사진 업로드</label>
                <div className="mt-2">
                    <input ref={uploadRef} type="file" multiple onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-slate-700 hover:file:bg-violet-100" />
                </div>
                {previewFiles.length > 0 && (
                    <div className="mt-2 space-y-2">
                        {previewFiles.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <img src={file.url} alt={file.name} className="w-16 h-16 object-cover rounded" />
                                <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white" onClick={handleClickModify}>
                        수정하기
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ModifyComponent;