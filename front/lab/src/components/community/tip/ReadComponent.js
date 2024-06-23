import heartEmpty from "../../../resources/images/heart_empty.png";
import replyIcon from "../../../resources/images/reply.png";
import ReplyComponent from "../../common/ReplyComponent";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { API_SERVER_HOST, getOneTip, deleteOne } from "../../../api/communityApi";
import useCustomTip from "../../../hooks/useCustomTip";
import ResultModal from "../../common/ResultModal";

const initState = {
    commNo: 0,
    title: '',
    content: '',
    commHit: 0,
    commCategory: '',
    uploadFileNames: []
}

const host = API_SERVER_HOST;

const ReadComponent = ({commNo}) => {
    const [result, setResult] = useState(null); //게시글 삭제 모달창
    const [addResultModal, setAddResultModal] = useState(null); //댓글 등록 모달창
    const [tip, setTip] = useState(initState); //해당 게시물 내용
    const [input, setInput] = useState(''); //댓글 내용
    const { moveToList, moveToModify } = useCustomTip();
    const loginInfo = useSelector((state) => state.loginSlice);
    const id = loginInfo.id;
    const email = loginInfo?.email;

    useEffect(() => {
        getOneTip(commNo).then(data => {
            console.log(data)
            setTip(data)
            console.log("id값:",id);
            console.log("email값:",email);
        })
    }, [commNo])

    const handleClickDelete = (e) => {
        deleteOne(commNo);
        setResult("게시글이 삭제되었습니다");
    }

    const closeModal = () => {
        setResult(null);
        moveToList();
    }

    // 댓글 등록
    const handleClickAddReply = () => {
        if(!email){
            setAddResultModal("로그인 후 이용할 수 있습니다");
            return;
        }
        if(!input){
            setAddResultModal("내용을 입력해주세요");
            return;
        }
        console.log("댓글내용:",input);
    };

    return (
        <div className="relative p-4">
            <div className="max-w-5xl mx-auto">
                <div className="mt-3 w-full rounded-b flex flex-col justify-between leading-normal">
                    <div>
                        {result && <ResultModal title={'알림'} content={`${result}`} callbackFn={closeModal} />}
                        <div className="mb-2">
                            <span className="text-slate-900 text-base bg-teal-200 rounded-3xl px-2 pt-0.5 pb-1">
                                {tip.commCategory === '1' && '부동산'}
                                {tip.commCategory === '2' && '인테리어'}
                                {tip.commCategory === '3' && '할인정보'}
                                {tip.commCategory === '4' && '기타'}
                            </span>
                        </div>
                        <h1 className="text-gray-900 font-bold text-3xl">{tip.title}</h1>
                        <div className="py-5 text-sm font-regular text-gray-900 flex">
                            <p className="mr-3 flex flex-row items-center">
                                <p className="ml-1">{tip.nickname}</p>
                            </p>
                            <p className="mr-3 flex flex-row items-center">
                                <p className="ml-1">{tip.regDate}</p>
                            </p>
                            <p className="ml-auto mr-2 flex flex-row">
                                <img src={heartEmpty} width="20" alt="..."></img><span className="mx-1">{tip.commHit}</span>
                                <img src={replyIcon} width="20" alt="..."></img><span className="mx-1">0</span>
                            </p>
                        </div>
                        <hr></hr>

                        {tip.uploadFileNames.map((imgFile, i) =>
                            <img
                                alt="tip"
                                key={i}
                                width={600}
                                src={`${host}/api/community/tip/display/${imgFile}`}
                                className="my-3" />
                        )}

                        <p className="text-base leading-8 my-5">
                            {tip.content.split('\n').map((line) => {
                                return (
                                    <span>{line}<br /></span>
                                );
                            })}
                        </p>
                        <hr></hr>
                        <div className="flex justify-center space-x-2 mt-4">
                            {email === tip.user_id ?
                                (
                                    <>
                                        <button type="button" className="bg-gray-400 text-white rounded-md text-base px-1 py-0.5 hover:bg-gray-500 ml-1" onClick={() => moveToModify(commNo)}>수정하기</button>
                                        <button type="button" className="bg-gray-400 text-white rounded-md text-base px-1 py-0.5 hover:bg-gray-500 ml-1" onClick={handleClickDelete}>삭제하기</button>
                                    </>
                                )
                                :
                                (<></>)
                            }
                            <button type="button" className="bg-gray-400 text-white rounded-md text-base px-1 py-0.5 hover:bg-gray-500 ml-1" onClick={() => moveToList()}>목록으로 이동</button>
                        </div>
                        <div>
                            <div className="my-6 flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="댓글을 입력해주세요"
                                    value={input}
                                    className="flex-1 py-2 px-2 text-base bg-white rounded-lg border border-gray-200"
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => (e.key === 'Enter' ? handleClickAddReply() : null)}
                                />
                                <button
                                    type="button"
                                    className="py-2.5 px-4 text-xs font-medium text-center text-white bg-subColor opacity-90 rounded-lg hover:bg-amber-900"
                                    onClick={handleClickAddReply}
                                >
                                    댓글 등록
                                </button>
                            </div>

                        </div>
                        <ReplyComponent />
                    </div>
                </div>
            </div>
            {addResultModal && (<ResultModal title={'알림'} content={`${addResultModal}`} callbackFn={() => setAddResultModal(null)} />)}
        </div>
    );
}

export default ReadComponent;