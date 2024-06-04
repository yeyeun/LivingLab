import heartEmpty from "../../../resources/images/heart_empty.png";
import replyIcon from "../../../resources/images/reply.png";
import CommentComponent from "../../common/CommentComponent";

const ReadComponent = () => {
return(
<div className="relative p-4">
    <div className="max-w-5xl mx-auto">
        <div className="mt-3 w-full rounded-b flex flex-col justify-between leading-normal">
            <div>

                <div className="mb-2">
                    <span className="text-slate-900 text-base bg-teal-200 rounded-3xl px-2 pt-0.5 pb-1">인테리어</span>
                </div>
                <h1 className="text-gray-900 font-bold text-3xl">셀프 인테리어 TIP 공유합니다</h1>
                <div className="py-5 text-sm font-regular text-gray-900 flex">
                    <p className="mr-3 flex flex-row items-center">
                      <p className="ml-1">김유저</p>
                    </p>
                    <p className="mr-3 flex flex-row items-center">
                      <p className="ml-1">2024-06-02</p>
                    </p>
                    <p className="ml-auto mr-2 flex flex-row">
                        <img src={heartEmpty} width="20" alt="..."></img><span className="mx-1">12</span>
                        <img src={replyIcon} width="20" alt="..."></img><span className="mx-1">5</span>
                    </p>
                </div>
                <hr></hr>
                <p className="text-base leading-8 my-5">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <hr></hr>
                <div className="float-right">
                    <button type="button" className="bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1">수정하기</button>
                    <button type="button" className="bg-gray-400 text-white rounded-md text-sm px-1 py-0.5 hover:bg-gray-500 ml-1">삭제하기</button>
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
                <CommentComponent/>
            </div>
        </div>
    </div>
</div>
);
}

export default ReadComponent;