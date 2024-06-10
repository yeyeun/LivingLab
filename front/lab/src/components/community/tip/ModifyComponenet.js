import { useRef, useState, useEffect } from "react";
import { modifyTip, getOneTip, API_SERVER_HOST } from "../../../api/communityApi";
import ResultModal from "../../common/ResultModal";
import useCustomTip from "../../../hooks/useCustomTip";

const initState = {
    user_id: 'iamuser',
    type: '1', //자취TIP 게시판은 1
    title: '',
    content: '',
    commHit: 0,
    commCategory: '',
    nickname: '김유저',
    files: [],
    uploadFileNames: []
};

const host = API_SERVER_HOST;

const ModifyComponenet = ({commNo}) => {
    const [result, setResult] = useState(null);
    const [addResultModal, setAddResultModal] = useState(null);
    const [ tip, setTip ] = useState({...initState});
    const { moveToRead } = useCustomTip();
    const uploadRef = useRef();

    useEffect(() => {
        getOneTip(commNo).then(data => {
            console.log(data)
            setTip(data)
        })
    }, [commNo])

    const handleChangeTip = (e) => {
        tip[e.target.name] = e.target.value;
        setTip({...tip});
    }
    const handleClickAdd = (e) => {
        //유효성 검사
        if (!tip.title || !tip.content){
            setAddResultModal("제목과 내용을 입력해주세요");
            return;
        }
        const files = uploadRef.current.files;
        const formData = new FormData();
        for(let i=0; i<files.length; i++){
            formData.append("files",files[i]);
        }
        //파일이 아닌 데이터를 formData에 추가
        formData.append("user_id", tip.user_id);
        formData.append("type",tip.type);
        formData.append("title", tip.title);
        formData.append("content", tip.content);
        formData.append("commHit", tip.commHit);
        formData.append("commCategory",tip.commCategory);
        formData.append("nickname", tip.nickname);

        // for (const x of formData.entries()){
        //     console.log(x);
        // }
        modifyTip(formData);
        setResult("게시글이 수정되었습니다");
    }
    const closeModal = () => {
        setResult(null);
        moveToRead();
    }

    const handleRemoveImage = (index) => {
        const newUploadFileNames = tip.uploadFileNames.filter((_, i) => i !== index);
        console.log("index:",index);
        setTip({ ...tip, uploadFileNames: newUploadFileNames });
        console.log("newUploadFileNames : ", newUploadFileNames);
    }

    return(
        <div>
            <div className="space-y-12 text-base">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {result? <ResultModal title={'알림'} content={`${result}`}
                        callbackFn={closeModal}/> : <></>}
                        {addResultModal ? (
                        <ResultModal title={'알림'} content={`${addResultModal}`}
                        callbackFn={() => setAddResultModal(null)}/>
                        ) : <></>}
                        <div className="sm:col-span-3">
                            <label for="commCategory" className="block font-medium leading-6 text-gray-900">카테고리</label>
                            <div className="mt-2">
                                <select id="commCategory" name="commCategory" value={tip.commCategory} onChange={handleChangeTip}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                    <option value='1'>부동산</option>
                                    <option value='2'>인테리어</option>
                                    <option value='3'>할인정보</option>
                                    <option value='4'>기타</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label for="title" className="block font-medium leading-6 text-gray-900">제목</label>
                            <div className="mt-2">
                                <input type={'text'} name="title" id="title" value={tip.title} onChange={handleChangeTip} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"/>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label for="content" className="block font-medium leading-6 text-gray-900">내용</label>
                            <div className="mt-2">
                                <textarea id="content" name="content" value={tip.content} onChange={handleChangeTip} rows="6"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                    {tip.content}
                                </textarea>
                            </div>
                        </div>
                        <div className="col-span-full">
                            {tip.uploadFileNames.map((imgFile, i) =>
                            <div key={i} className="relative inline-block">
                                <img alt="tip" src={`${host}/api/community/tip/display/${imgFile}`} className="my-3 w-36"/>
                                <button type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        aria-label="Remove image">
                                        X
                                    </button>
                            </div>
                            )}
                            <div className="mt-2">
                                <input ref={uploadRef} type={'file'} multiple={true} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-slate-700 hover:file:bg-violet-100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>moveToRead(tip.commNo)}>취소하기</button>
                <button type="button" className="rounded-md bg-mainColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleClickAdd}>수정하기</button>
            </div>
    </div>
    );
}

export default ModifyComponenet;