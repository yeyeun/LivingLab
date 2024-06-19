import React, { useState, useEffect, useRef } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { postAddBuy } from '../../api/buyApi';
import ResultModal from '../common/ResultModal';
import PostComponent from '../common/PostComponent';
import { getUser } from './../../api/userApi';
import { useSelector } from 'react-redux';
import iconNext from '../../resources/images/icon-next.png';
import iconEdit from '../../resources/images/iconEdit.png'

const initState = {
  id: 0,
  nickname: '',
  title: '',
  location: '',
  content: '',
  buyCategory: '',
  max: 2,
  current: 1,
  deadline: '',
  buyHit: '0',
  files: [],
};

const AddComponent = () => {
  const { moveToList } = useCustomMove();
  const [postImageFiles, setPostImageFiles] = useState([]); // 이미지 파일 프리뷰
  const [buy, setBuy] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const [addResultModal, setAddResultModal] = useState(null);
  const imgRef = useRef();

  const [user, setUser] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice); // 전역상태에서 loginSlice는 로그인 사용자의 상태정보
  const ino = loginInfo.id;
  useEffect(() => {
    getUser(ino).then((data) => {
      setUser(data);
    });
  }, [ino]);

  const handleImageChange = (e) => {
    // 이미지 변경
    const files = Array.from(e.target.files);
    const nonImageFiles = files.filter(file => !file.type.startsWith('image/'));

    if (nonImageFiles.length > 0) {
        setAddResultModal("이미지 파일만 등록 가능합니다");
        imgRef.current.value = "";
        setPostImageFiles([]);
        return;
    }

    const imagePreviews = files.map(file => ({
        url: URL.createObjectURL(file),
        name: file.name
    }));

    setPostImageFiles(imagePreviews);
  };

  const handleRemoveImage = (index) => {
    // 이미지 제거
    setPostImageFiles(postFiles => postFiles.filter((_, i) => i !== index));
    updateFileInput(index);
  };
  
  const updateFileInput = (removeIndex) => {
    // 입력된 파일 업데이트
    const dataTransfer = new DataTransfer();
    const files = Array.from(imgRef.current.files);
    files.forEach((file, index) => {
      if (index !== removeIndex) { //removeIndex와 일치하지 않는 파일만 dataTransfer에 추가
        dataTransfer.items.add(file);
      }
    });
    imgRef.current.files = dataTransfer.files; //제거된 파일 반영
  };

  const handleChangeBuy = (e) => {
    const { name, value } = e.target;
    setBuy((prev) => ({ ...prev, [name]: value }));
  };
  const handleClickAdd = async () => {
    if (!buy.buyCategory) {
      setAddResultModal('카테고리를 선택해주세요');
      return;
    }
    if (!buy.title || !buy.content) {
      setAddResultModal('제목과 내용을 입력해주세요');
      return;
    }
    if(!buy.deadline || !buy.location){
      setAddResultModal('마감시간과 모임장소를 입력해주세요');
      return;
    }
    const time = new Date();
    const timeElement = new Date(buy.deadline);
    console.log("time:",time);
    console.log("timeElement:",timeElement);
    if(time > timeElement){
      setAddResultModal('현재 시간보다 이전의 날짜는 설정할 수 없습니다');
      return;
    }

    const files = imgRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }

    formData.append('id', ino);
    formData.append('nickname', user.nickname);
    formData.append('title', buy.title);
    formData.append('location', buy.location);
    formData.append('content', buy.content);
    formData.append('buyCategory', buy.buyCategory);
    formData.append('max', buy.max);
    formData.append('current', buy.current);
    formData.append('deadline', buy.deadline);
    formData.append('buyHit', buy.buyHit);

    for (const x of formData.entries()) {
      console.log(x);
     };
    postAddBuy(formData);
    setResult('게시글이 등록되었습니다');
  };
  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  const setAddress = (address) => {
    setBuy((prev) => ({ ...prev, location: address }));
  };

  const handleInputValidation = (e) => {
    const value = e.target.value;
    if (value !== "" && (isNaN(value) || value < 2)) {
      e.target.value = Math.max(2, value);
    }
    handleChangeBuy(e);
  };

  return (
    <div>
      <div className="flex items-center w-1/2 mx-auto text-xl font-semibold pl-2 border-l-4 border-teal-300">
        공동구매 <img src={iconNext} className="w-7 mx-2" alt="Next Icon" /> 글 작성
      </div>
      <div className="grid grid-cols-8 gap-3 w-1/2 mx-auto mt-2 p-2 text-xl shadow-set mb-5">
        <div className="col-start-3 col-span-4 mt-2 border rounded overflow-x-scroll whitespace-nowrap">
          {postImageFiles.map((file, index) => (
          <div key={index} className="relative m-3 w-36 h-36 inline-block align-top border">
            <img src={file.url} alt={file.name} className="w-36 h-36 object-cover"/>
            <button type="button" onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-slate-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-slate-600"
              aria-label="Remove image">
              X
            </button>
          </div>
          ))}
          <div className="relative inline-block m-3 w-36 h-36 border-2 border-gray-300 border-dashed rounded-md items-center justify-center cursor-pointer hover:bg-slate-100">
            <input ref={imgRef} id="file-upload" type="file" multiple={true}
              onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer"/>
            <label htmlFor="file-upload" className="text-mainColor font-bold text-4xl flex flex-col items-center justify-center h-full w-full">
              +
              <span className="text-base mt-1">이미지 첨부</span>
            </label>
          </div>
        </div>
        <div className="col-start-2 col-span-2">
          <label htmlFor="buyCategory" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <img src={iconEdit} className="w-3 h-3" alt="edit"></img>&nbsp;카테고리
          </label>
          <select id="buyCategory" name="buyCategory" 
            className="w-full pl-2 h-9 rounded-md border border-stone-400 text-base" 
            value={buy.buyCategory} 
            onChange={handleChangeBuy}
          >
            <option disabled hidden value="">카테고리 선택</option>
            <option value="1">배달음식</option>
            <option value="2">생필품</option>
            <option value="3">식료품</option>
            <option value="4">가구/가전</option>
            <option value="5">기타</option>
          </select>
        </div>
        <div className="col-start-5 col-span-1">
          <label htmlFor="max" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <img src={iconEdit} className="w-3 h-3" alt="edit"></img>&nbsp;모집인원
          </label>
          <input type="number" name="max" id="max" value={buy.max} min="2" step="1" onInput={handleInputValidation}
          onChange={handleChangeBuy} className="w-full h-9 pl-2 rounded-md border border-stone-400 text-base"/>
        </div>
        <div className="col-start-6 col-span-2">
          <label htmlFor="deadline" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <img src={iconEdit} className="w-3 h-3" alt="edit"></img>&nbsp;모집마감시간
          </label>
          <input type="datetime-local" required aria-required="true" name="deadline" id="deadline"
          value={buy.deadline} onChange={handleChangeBuy} className="w-full h-9 rounded-md border border-stone-400 text-base"/>
        </div>
        <div className="col-start-2 col-span-6">
          <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <img src={iconEdit} className="w-3 h-3" alt="edit"></img>&nbsp;제목
          </label>
          <input type="text" name="title" id="title" value={buy.title} onChange={handleChangeBuy} 
          placeholder="제목을 입력하세요" className="w-full h-9 pl-2 rounded-md border border-stone-400 placeholder:text-base pb-1"/>
        </div>
        <div className="col-start-2 col-span-6">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <img src={iconEdit} className="w-3 h-3" alt="edit"></img>&nbsp;거래장소
          </label>
          <div className="flex">
            <div className="w-1/5 text-base">
              <PostComponent setAddress={setAddress}></PostComponent>
            </div>
            <div className="w-4/5 pl-1">
              <input className="w-full h-10 pl-2 rounded-md border border-stone-400 placeholder:text-base pb-1" name="addr" type="text"
              placeholder="주소(우편번호 및 도로명 검색)" value={buy.location}/>
            </div>
          </div>
        </div>
        <div className="col-start-2 col-span-6">
          <label htmlFor="content" className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <img src={iconEdit} className="w-3 h-3" alt="edit"></img>&nbsp;내용
          </label>
          <textarea name="content" id="content" value={buy.content} rows="6" onChange={handleChangeBuy} placeholder="내용을 입력하세요"
          className="w-full pl-2 rounded-md border border-stone-400 placeholder:text-base pb-1"></textarea>
        </div>
        <div className="col-start-6 col-span-2 mb-3">
          <div className="flex">
            <button className="text-base text-white bg-mainColor p-2 rounded-md w-1/2 mr-2 hover:bg-emerald-600" onClick={handleClickAdd}>등록하기</button>
            <button className="text-base text-white bg-slate-300 p-2 rounded-md w-1/2 hover:bg-slate-400" onClick={() => moveToList()}>목록</button>
          </div>
        </div>
        {result && <ResultModal title={'알림'} content={`${result}`} callbackFn={closeModal} />}
        {addResultModal && <ResultModal title={'알림'} content={`${addResultModal}`} callbackFn={() => setAddResultModal(null)} />}
      </div>
    </div>
  );
};
export default AddComponent;