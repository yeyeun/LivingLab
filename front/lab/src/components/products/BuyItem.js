import image from '../../resources/images/ex1.png';
import userIcon from '../../resources/images/user.png';
import mapIcon from '../../resources/images/map.png';

const BuyItem = () => {
    return(
        <div className="w-full mb-4">
            <a href="#!" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow sm:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={image} alt="..."/>
                <div className="flex flex-col justify-between p-4 mx-4 leading-normal">
                    <div className="mb-2 inline-flex">
                        <span className="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-xl border border-gray-900 dark:bg-gray-700 dark:text-gray-300">생필품</span>
                        <div className="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-xl border border-gray-900 dark:bg-gray-700 dark:text-gray-300">
                            <img src={userIcon} alt="..." className="w-3 inline"/>&ensp;1 / 2
                        </div>
                        <div className="text-base">
                            진행 중
                        </div>
                    </div>
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">공동구매 게시글 제목</h5>
                    <div className="mb-3 text-base text-gray-700 dark:text-gray-400">
                        <img src={mapIcon} alt="..." className="w-3 inline"/>&ensp;OO역 O번 출구 앞
                    </div>
                </div>
            </a>
        </div>
    );
}

export default BuyItem;