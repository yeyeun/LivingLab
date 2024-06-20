const FindIdModal = ({title,isVisible,callbackFn}) => {
    return(
        <div
        style={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        className="z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20"
        onClick={() => {
          if (callbackFn) {
            callbackFn();
          }
        }}
      >
        <div
          className="relative bg-white shadow opacity-100 w-1/4 rounded-md px-6 min-w-[300px] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
        >
          <div className="w-full text-center bg-warming-400 mt-6 mb-6 pb-2 text-base border-b-2 border-gray-300">
            {title}
          </div>
          <div className="w-full text-center text-sm pt-4 pb-4">
            <span>회원정보에 등록된 이름과 전화번호를 입력해주세요</span>
          </div>
          <div class="w-2/3 my-2 transform border-b-2 bg-transparent text-base duration-300 focus-within:border-teal-700">
            <input type="text" placeholder="이름" class="w-full p-1 border-none bg-transparent outline-none focus:outline-none"/>
          </div>
          <div class="w-2/3 my-2 transform border-b-2 bg-transparent text-base duration-300 focus-within:border-teal-700">
            <input type="text" placeholder="전화번호" class="w-full p-1 border-none bg-transparent outline-none focus:outline-none"/>
          </div>
          <div className="w-full flex justify-center mt-5 mb-4">
            <button className="rounded bg-mainColor mt-4 mb-4 mr-2 px-4 py-1 text-base text-white hover:bg-teal-500 transition-colors">
              아이디 찾기
            </button>
            <button
              className="rounded bg-slate-400 mt-4 mb-4 px-4 py-1 text-base text-white hover:bg-slate-500 transition-colors"
              onClick={() => {
                if (callbackFn) {
                  callbackFn();
                }
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
};

export default FindIdModal;