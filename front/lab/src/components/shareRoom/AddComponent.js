import React, { useRef, useState } from "react";
import { postAdd } from "../../api/shareRoomApi";
import ResultModal from "../common/ResultModal";
import useRoomCustomMove from "../../hooks/useRoomCustomMove";
import { useSelector } from 'react-redux';
import PostComponent from "../common/PostComponent";
import Image1 from '../../resources/images/radio1.svg';
import Image2 from '../../resources/images/radio2.svg';



const AddComponent = () => {

    const [addResultModal, setAddResultModal] = useState(null);
    const [result, setResult] = useState(null);
    const [previewFiles, setPreviewFiles] = useState([]);
    const { moveToList } = useRoomCustomMove()
    const uploadRef = useRef();
    const [address, setAddress] = React.useState('');
    const [popup, setPopup] = React.useState(false);
    const [checkedRadio, setCheckedRadio] = useState(null);
    const loginState = useSelector((state) => state.loginSlice);

    const [userId, setUserId] = useState(loginState.id);


    const initState = {
        roomNo: 0,
        title: '',
        rentFee: 0,
        parking: '',
        option1: '',
        location: '',
        files: [],
        userId: userId,
        uploadFileNames: []
    }
    const [shareRoom, setShareRoom] = useState({ ...initState })


    const handleChangeShareRoom = (e) => {
        shareRoom[e.target.name] = e.target.value
        setShareRoom({ ...shareRoom })
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

    const handleClickAdd = (e) => {

        if (!shareRoom.title || !shareRoom.content) {
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

        // 파일이 아닌 데이터를 formData에 추가
        formData.append("userId", shareRoom.userId);
        formData.append("title", shareRoom.title);
        formData.append("content", shareRoom.content);
        formData.append("rentFee", shareRoom.rentFee);
        formData.append("parking", shareRoom.parking);
        formData.append("option1", shareRoom.option1);
        formData.append("rentEndDate", shareRoom.rentEndDate);
        formData.append("rentStartDate", shareRoom.rentStartDate);

        postAdd(formData);
        setResult("게시글이 등록되었습니다");
    }

    const closeModal = () => {
        setResult(null);
        moveToList();
    }


    return (
        <div id="full" className="w-[1200px] h-full mx-auto bg-cyan-300">
            <div id="title-area" className="pt-[80px] pb-[64px]">
                <h1 className="text-5xl text-gray-900 leading-3 font-bold text-center tracking-tighter">
                    자취방쉐어
                </h1>
            </div>
            <div id="main-area" className="w-full bg-green-300">
                <section id="info" className="">
                    <header className="flex items-end justify-between mb-4">
                        <h1 className="text-xl text-gray-900 leading-8 font-bold ">방 정보</h1>
                    </header>
                    <table id="select-info" className="w-full border-t-2 border-gray-900">
                        <colgroup>
                            <col className="w-[150px]"></col>
                            <col></col>
                        </colgroup>
                        <tbody>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-200">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        제목
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">
                                    <div className="flex items-start justify-start w-full">
                                        <div className="flex-none w-auto">
                                            <div className="flex w-full pt-0 pb-0">
                                                <div className="flex-grow flex flex-wrap justify-start mt-[-20px] ml-[-16px]">
                                                    <label className="mt-5 ml-4 flex-none flex items-start justify-start max-w-full pt-0 pb-0">
                                                        <input className="flex-none w-6 h-6 m-0 border-0 rounded-full appearance-none cursor-pointer"
                                                        type="radio" 
                                                        name="parking"
                                                        value="O"
                                                        checked={shareRoom.parking === 'O'}
                                                        onChange={handleChangeShareRoom}
                                                        style={{ backgroundImage: shareRoom.parking === 'O' ? `url(${Image2})` : `url(${Image1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></input>
                                                        <p>가능</p>
                                                    </label>
                                                    <label className="mt-5 ml-4 flex-none flex items-start justify-start max-w-full pt-0 pb-0">
                                                    <input className="flex-none w-6 h-6 m-0 border-0 rounded-full appearance-none cursor-pointer"
                                                        type="radio" 
                                                        name="parking"
                                                        value="X"
                                                        checked={shareRoom.parking === 'X'}
                                                        onChange={handleChangeShareRoom}
                                                        style={{ backgroundImage: shareRoom.parking === 'X' ? `url(${Image2})` : `url(${Image1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></input>
                                                        <p>불가능</p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr></tr>
                            <tr></tr>
                            <tr></tr>
                        </tbody>
                    </table>
                </section>
                <section id="photo" className="">

                </section>
            </div>
        </div>
    );
}
export default AddComponent;