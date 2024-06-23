import heartEmpty from "../../../resources/images/heart_empty.png";
import replyIcon from "../../../resources/images/reply.png";
import ReplyComponent from "../../common/ReplyComponent";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { API_SERVER_HOST, getOneQna, deleteOne } from "../../../api/communityApi";
import useCustomQna from "../../../hooks/useCustomQna";
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
    const [result, setResult] = useState(null);
    const [qna, setQna] = useState(initState);
    const { moveToList, moveToModify } = useCustomQna();
    const loginInfo = useSelector((state) => state.loginSlice);
    const id = loginInfo?.email;

    useEffect(() => {
        getOneQna(commNo).then(data => {
            console.log(data)
            setQna(data)
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

return(
<div className="relative p-4">
    <div className="max-w-5xl mx-auto">
        <div className="mt-3 w-full rounded-b flex flex-col justify-between leading-normal">
            <div>
            {result && <ResultModal title={'알림'} content={`${result}`} callbackFn={closeModal} />}
                <div className="mb-2">
                    <span className="text-slate-900 text-base bg-teal-200 rounded-3xl px-2 pt-0.5 pb-1">
                        {qna.commCategory === '1' && '부동산'}
                        {qna.commCategory === '2' && '인테리어'}
                        {qna.commCategory === '3' && '할인정보'}
                        {qna.commCategory === '4' && '기타'}
                    </span>
                </div>
                <h1 className="text-gray-900 font-bold text-3xl">{qna.title}</h1>
                <div className="py-5 text-sm font-regular text-gray-900 flex">
                    <p className="mr-3 flex flex-row items-center">
                      <p className="ml-1">{qna.nickname}</p>
                    </p>
                    <p className="mr-3 flex flex-row items-center">
                      <p className="ml-1">2024-06-02</p>
                    </p>
                    <p className="ml-auto mr-2 flex flex-row">
                        <img src={heartEmpty} width="20" alt="..."></img><span className="mx-1">{qna.commHit}</span>
                        <img src={replyIcon} width="20" alt="..."></img><span className="mx-1">0</span>
                    </p>
                </div>
                <hr></hr>

                {qna.uploadFileNames.map((imgFile, i) =>
                    <img
                        alt="qna"
                        key={i}
                        width={600}
                        src={`${host}/api/community/qna/display/${imgFile}`}
                        className="my-3"/>
                )}

                <p className="text-base leading-8 my-5">
                    {qna.content.split('\n').map((line) => {
                        return(
                            <span>{line}<br/></span>
                        );
                    })}
                </p>
                <hr></hr>
                <div className="flex justify-center space-x-2 mt-4">
                    { id === qna.user_id?
                    (
                    <>
                    <button type="button" className="bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1" onClick={() => moveToModify(commNo)}>수정하기</button>
                    <button type="button" className="bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1" onClick={handleClickDelete}>삭제하기</button>
                    </>
                    )
                    :
                    (<></>)
                    }
                    <button type="button" className="bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1" onClick={() => moveToList()}>목록으로 이동</button>
                </div>
                <div>
                <form className="my-6">
                    <div className="py-2 px-4 mb-4 mt-9 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label for="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="3" className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                        placeholder="댓글을 입력해주세요" required></textarea>
                    </div>
                    <div>
                    <button type="submit"
                    className="float-right items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-subColor opacity-90 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        댓글 등록
                    </button>
                    </div>
                </form>
                </div>
                <ReplyComponent/>
            </div>
        </div>
    </div>
</div>
);
}

export default ReadComponent;