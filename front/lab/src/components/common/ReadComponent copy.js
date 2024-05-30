import image from '../../resources/images/room.jpg';

const ReadComponent = () => {
    return(
        <div class="flex flex-col w-3/4 gap-5 p-2 mx-auto bg-white shadow-lg select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">            
            <img alt="..." src={image} class="h-52 sm:h-full sm:w-72 rounded-xl"/>            
            <div class="flex flex-col flex-1 gap-5 sm:p-2">
                <div class="flex flex-col flex-1 gap-3">
                    <div class="w-full bg-gray-200 h-10 rounded-2xl flex items-center justify-center">13평 2층 원룸 입니다.
                    </div>
                    <div class="w-full h-5/6 bg-gray-200 rounded-2xl flex justify-between items-center px-4">
                        <span class="font-bold">월세</span>
                        <span>150,000원</span>
                        <br/>
                        <span class="font-bold">주차</span>
                        <span>가능</span>
                    </div>

                </div>
                <div class="flex gap-3 mt-auto">
                    <div class="w-20 h-8 bg-gray-200 rounded-full ">
                    </div>
                    <div class="w-20 h-8 bg-gray-200 rounded-full ">
                    </div>
                    <div class="w-20 h-8 ml-auto bg-gray-200 rounded-full ">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;