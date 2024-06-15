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
                    <table id="select-info" className="w-full border-t-2 border-gray-900 border-collapse">
                        <colgroup>
                            <col className="w-[150px]"></col>
                            <col></col>
                        </colgroup>
                        <tbody>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        제목
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">
                                    <div className="w-auto">
                                        <div className="w-full flex">
                                            <div className="flex-grow flex flex-wrap justify-start">
                                                <div className="">
                                                    <input type="text" value={shareRoom.title} onChange={handleChangeShareRoom} name="title" className="w-full h-full text-gray-900 text-sm leading-6 font-normal px-4 border border-gray-200 rounded-sm bg-white select-none">
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        상세설명
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">
                                    <div className="w-auto">
                                        <div className="w-full flex">
                                            <div className="flex-grow flex flex-wrap justify-start">
                                                <label className="flex flex-col w-full h-48 py-2.5 px-4 relative">
                                                    <div className="flex-grow flex items-start w-full h-full">
                                                        <textarea row="3" value={shareRoom.content} onChange={handleChangeShareRoom} name="content" className="py-2.5 px-4 text-gray-900 text-sm leading-6 font-normal border-0 bg-transparent absolute inset-0.5 select-none resize-none z-10">
                                                        </textarea>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        금액
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">
                                    <div className="w-[120px]">
                                        <div className="w-full flex">
                                            <div className="flex-grow flex flex-wrap justify-start">
                                                <div className="block w-full h-11 relative">
                                                    <input type="text" value={shareRoom.rentFee} onChange={handleChangeShareRoom} name="rentFee" className="w-full h-full text-gray-900 text-sm leading-6 font-normal px-9 border border-gray-200 rounded-sm bg-white select-none">
                                                    </input>
                                                    <p className="text-gray-900 text-sm leading-6 font-normal whitespace-nowrap absolute top-1/4 right-4 pointer-events-none select-none">원</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        옵션
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">
                                    <div className="w-auto">
                                        <div className="w-full flex">
                                            <div className="flex-grow flex flex-wrap justify-start">
                                                <div className="">
                                                    <input type="text" value={shareRoom.option1} onChange={handleChangeShareRoom} name="option1" className="w-full h-full text-gray-900 text-sm leading-6 font-normal px-4 border border-gray-200 rounded-sm bg-white select-none">
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        주차
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
                                                        <p className="pl-1 text-black text-sm leading-6 select-none cursor-pointer">가능</p>
                                                    </label>
                                                    <label className="mt-5 ml-4 flex-none flex items-start justify-start max-w-full pt-0 pb-0">
                                                    <input className="flex-none w-6 h-6 m-0 border-0 rounded-full appearance-none cursor-pointer"
                                                        type="radio" 
                                                        name="parking"
                                                        value="X"
                                                        checked={shareRoom.parking === 'X'}
                                                        onChange={handleChangeShareRoom}
                                                        style={{ backgroundImage: shareRoom.parking === 'X' ? `url(${Image2})` : `url(${Image1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></input>
                                                        <p className="pl-1 text-black text-sm leading-6 select-none cursor-pointer">불가능</p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        시작일
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">
                                    <div className="w-auto">
                                        <div className="w-full flex">
                                            <div className="flex-grow flex flex-wrap justify-start">
                                                <div className="">
                                                    <input type="date" value={shareRoom.rentStartDate} onChange={handleChangeShareRoom} name="rentStartDate" className="w-full h-full text-gray-900 text-sm leading-6 font-normal px-4 border border-gray-200 rounded-sm bg-white select-none">
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        종료일
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">
                                    <div className="w-auto">
                                        <div className="w-full flex">
                                            <div className="flex-grow flex flex-wrap justify-start">
                                                <div className="">
                                                    <input type="date" value={shareRoom.rentEndDate} onChange={handleChangeShareRoom} name="rentEndDate" className="w-full h-full text-gray-900 text-sm leading-6 font-normal px-4 border border-gray-200 rounded-sm bg-white select-none">
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section id="photo" className="mt-12">
                    <header className="flex items-end justify-between mb-4">
                        <h1 className="text-xl text-gray-900 leading-8 font-bold ">사진 등록</h1>
                    </header>
                    <table id="select-info" className="w-full border-t-2 border-gray-900 border-collapse">
                        <colgroup>
                            <col className="w-[150px]"></col>
                            <col></col>
                        </colgroup>
                        <tbody>
                            <tr className="border-b border-neutral-200">
                                <th className="pl-5 text-left align-middle bg-neutral-100">
                                    <h1 className="text-[14px] text-gray-900 leading-6 font-bold">
                                        방 사진
                                    </h1>
                                </th>
                                <td className="align-middle px-4 py-5 border-l border-neutral-200">

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}
export default AddComponent;