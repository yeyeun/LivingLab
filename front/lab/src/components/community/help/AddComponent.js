import { useRef, useState } from "react";
import { postAddHelp } from "../../../api/communityApi";
import ResultModal from "../../common/ResultModal";
import useCustomHelp from "../../../hooks/useCustomHelp";

const initState = {
    user_id: 'iamuser',
    type: '4', //도움요청 게시판은 4
    title: '',
    content: '',
    commHit: 0,
    commCategory: '1', //도움요청 게시판은 세부 카테고리 없으므로 1로 값 고정
    nickname: '김유저',
    files: [],
};

const AddComponent = () => {
    const [result, setResult] = useState(null);
    const [addResultModal, setAddResultModal] = useState(null);
    const [ help, setHelp ] = useState({...initState});
    const { moveToList } = useCustomHelp(); //목록으로 이동하기
    const uploadRef = useRef();
    const handleChangeHelp = (e) => {
        help[e.target.name] = e.target.value;
        setHelp({...help});
    }
    const handleClickAdd = (e) => {
        if (!help.title || !help.content){
            setAddResultModal("제목과 내용을 입력해주세요");
            return;
        }
        const files = uploadRef.current.files;
        const formData = new FormData();
        for(let i=0; i<files.length; i++){
            formData.append("files",files[i]);
        }
        //파일이 아닌 데이터를 formData에 추가
        formData.append("user_id", help.user_id);
        formData.append("type",help.type);
        formData.append("title", help.title);
        formData.append("content", help.content);
        formData.append("commHit", help.commHit);
        formData.append("commCategory",help.commCategory);
        formData.append("nickname", help.nickname);

        // for (const x of formData.entries()){
        //     console.log(x);
        // }
        postAddHelp(formData);
        setResult("게시글이 등록되었습니다");
    }
    const closeModal = () => {
        setResult(null);
        moveToList();
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
                        <div className="col-span-full">
                            <label for="title" className="block font-medium leading-6 text-gray-900">제목</label>
                            <div className="mt-2">
                                <input type={'text'} name="title" id="title" value={help.title} onChange={handleChangeHelp} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"/>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label for="content" className="block font-medium leading-6 text-gray-900">내용</label>
                            <div className="mt-2">
                                <textarea id="content" name="content" value={help.content} onChange={handleChangeHelp} rows="6"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                                    {help.content}
                                </textarea>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <label for="about" className="block text-sm font-medium leading-6 text-gray-900">사진 업로드</label>
                            <div className="mt-2">
                                <input ref={uploadRef} type={'file'} multiple={true} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-slate-700 hover:file:bg-violet-100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>moveToList()}>취소하기</button>
                <button type="button" className="rounded-md bg-mainColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleClickAdd}>등록하기</button>
            </div>
    </div>
    );
}

export default AddComponent;