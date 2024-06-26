import React from 'react';

const MyLikeComponent = ({id}) => {

  return (
      <div className="w-1/2 h-72 m-4">
        <div className="p-6 h-full overflow-hidden bg-white rounded-lg border shadow-md">
          <div className="flex justify-between items-center ml-2 mb-6">
            <h3 className="text-xl font-bold leading-none text-gray-900">좋아요</h3>
            <a href="#!" className="text-base font-semibold text-gray-500">
              더보기
            </a>
          </div>
          구현 중
            {/* <ul className="divide-y divide-gray-200 h-full">




              <li className="py-4 hover:bg-slate-100 cursor-pointer">
                <div className="grid grid-cols-4">
                  <div className="col-span-1 text-center">
                    <span className="text-sm text-white truncate bg-gray-500 rounded px-2 mr-2">
                      생필품
                    </span>
                  </div>
                  <div className="col-span-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="text-base font-semibold text-gray-900">
                      곽티슈 같이 사실분 곽티슈 같이 사실분 곽티슈 같이 사실분 곽티슈 같이 사실분
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="text-sm text-gray-900 mr-1">
                    2024-06-24
                    </span>
                  </div>
                </div>
              </li>








            </ul> */}

        </div>
      </div>
  );
};
export default MyLikeComponent;
