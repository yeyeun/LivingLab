import image from '../../resources/images/room.jpg';

const ReadComponent = () => {
    return(
        <div class="flex flex-col w-3/4 gap-5 p-2 mx-auto bg-white shadow-lg select-none sm:p-4 sm:h-96 rounded-2xl sm:flex-row ">            
            <img alt="..." src={image} class="h-52 sm:h-80 sm:w-72 rounded-xl"/>            
            <div class="flex flex-col flex-1 gap-5 sm:p-2">
                <div class="flex flex-col flex-1 gap-5">
                    <div class="w-full bg-gray-200 h-10 rounded-2xl flex items-center justify-center">13평 2층 원룸 입니다.
                    </div>
                    <div class="w-full h-52 bg-gray-200 rounded-2xl px-4">
                        <div class="flow-root">
                            <dl class="-my-3 divide-y divide-gray-100 text-sm">
                                <div class="pt-6 pb-3 pl-2 flex">
                                    <div class="font-bold text-gray-900 flex-none text-lg">월세</div>
                                    <div class="grow"></div>
                                    <div class="text-gray-700 sm:col-span-2 flex-none">150,000원</div>
                                </div>
                                <div class="py-3 pl-2 flex">
                                    <div class="font-bold text-gray-900 flex-none text-lg">주차</div>
                                    <div class="grow"></div>
                                    <div class="text-gray-700 sm:col-span-2 flex-none">가능</div>
                                </div>
                                <div class="py-3 pl-2 flex">
                                    <div class="font-bold text-gray-900 flex-none text-lg">옵션</div>
                                    <div class="grow"></div>
                                    <div class="text-gray-700 sm:col-span-2 flex-none">세탁기,에어프라이어,에어컨,냉장고</div>
                                </div>
                                <div class="py-3 pl-2 flex">
                                    <div class="font-bold text-gray-900 flex-none text-lg">위치</div>
                                    <div class="grow"></div>
                                    <div class="text-gray-700 sm:col-span-2 flex-none">대전시 유성구 궁동 640</div>
                                </div>
                            </dl>
                        </div>
                    </div>               
                    <div class="flex gap-3 mt-auto">
                        <div class="w-20 h-8 ml-auto bg-gray-200 rounded-full">
                            문의하기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;