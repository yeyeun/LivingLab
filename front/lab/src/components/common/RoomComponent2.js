import image from '../../resources/images/room2.jpg';

const RoomComponent2 = () => {
    return(
        <div class="mx-12 overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80">
            <a href="#" class="block w-full h-full">
                <img alt="..." src={image} class="object-cover w-full max-h-40"/>
                <div class="w-full p-4 bg-white">
                    <p class="font-medium text-indigo-500 text-md">
                    </p>
                    <p class="mb-2 text-xl font-medium text-gray-800">
                        9평 원룸 입니다.
                    </p>
                    <p class="font-light text-gray-400 text-md">
                        110,000원/월
                    </p>
                </div>
            </a>
        </div> 
    );
}

export default RoomComponent2;