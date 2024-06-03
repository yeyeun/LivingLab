import image from '../../resources/images/room.jpg';
import useCustomMove from "../../hooks/useCustomMove"



const RoomComponent = () => {
    const { page, size, moveToList, moveToRead } = useCustomMove()

    return(
        <div class="mx-12 overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80">
            {serverData.dtoList.map((shareRoom) =>   
            <div className="block w-full h-full" onClick={()=>moveToRead(shareRoom.roomNo)}>
            
                <img alt="..." src={image} class="object-cover w-full max-h-40"/>
                <div class="w-full p-4 bg-white">
                    <p class="font-medium text-indigo-500 text-md">
                    </p>
                    <p class="mb-2 text-xl font-medium text-gray-800">
                        13평 원룸 2층입니다.
                    </p>
                    <p class="font-light text-gray-400 text-md">
                        140,000원/월
                    </p>
                </div>
            </div>
            )}
        </div> 
    );
}

export default RoomComponent;