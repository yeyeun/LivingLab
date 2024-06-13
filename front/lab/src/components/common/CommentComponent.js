import userIcon from "../../resources/images/user3.png"

const CommentComponent = () => {
    return(
        <article className="p-6 mb-3 mt-16 text-base border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                        <img className="mr-2 w-6 h-6 rounded-full" src={userIcon} alt="Bonnie Green"/>
                        자취고수
                    </p>
                    <p className="text-sm text-gray-600">2024-06-03</p>
                </div>
                <div>
                    <button className="inline-flex items-center p-1 text-xs font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    type="button">
                    수정
                    </button>
                    <button className="inline-flex items-center p-1 text-xs font-medium text-center text-white ml-1 bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    type="button">
                    삭제
                    </button>
                </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400">유용한 정보 감사합니다</p>
        </article>
    );
}

export default CommentComponent;