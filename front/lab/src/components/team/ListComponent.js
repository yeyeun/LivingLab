import image from '../../resources/images/defaultImage.jpg';
import userIcon from '../../resources/images/user.png';
import mapIcon from '../../resources/images/map.png';
import { useEffect, useState } from "react";
import { API_SERVER_HOST, getList } from "../../api/teamApi"
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const initState = {
    dtoList: [], //한 페이지에 불러오는 게시물 갯수
    pageNumList: [],
    pageRequestDto: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const host = API_SERVER_HOST

const ListComponent = () => {
    const{page, size, moveToList, moveToRead} = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    useEffect(()=>{
        getList({page,size}).then(data=>{
            console.log(data);
            setServerData(data);
        })
    }, [page,size]);
    return(
        <div>
        {serverData.dtoList.map(team=>
            <div key={team.teamNo} className="w-full mb-4" onClick={()=>moveToRead(team.teamNo)}>
                <div className="flex flex-col justify-center items-center px-5 bg-white border border-gray-200 rounded-lg shadow sm:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none" src={`${host}/api/team/display/${team.uploadFileNames[0]}`} alt="..."/>
                    <div className="flex flex-col p-4 mx-5 leading-normal">
                        <div className="mb-2 inline-flex">
                            <span className="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-xl border border-gray-900 dark:bg-gray-700 dark:text-gray-300">
                                {team.teamCategory === '1' && '운동'}
                                {team.teamCategory === '2' && '문화생활'}
                                {team.teamCategory === '3' && '반려동물'}
                                {team.teamCategory === '4' && '취미'}
                            </span>
                            <div className="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-xl border border-gray-900 dark:bg-gray-700 dark:text-gray-300">
                                <img src={userIcon} alt="..." className="w-3 inline"/>&ensp;{team.current} / {team.max}
                            </div>
                            <div className="text-base">
                                진행 중
                            </div>
                        </div>
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{team.title}</h5>
                        <div className="mb-3 text-base text-gray-700 dark:text-gray-400">
                            <img src={mapIcon} alt="..." className="w-3 inline"/>&ensp;{team.location}
                        </div>
                        <div className="mb-3 text-base text-gray-700 dark:text-gray-400">
                            <div className="float-right">{team.user_id}</div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <PageComponent serverData={serverData} movePage={moveToList}/>
        </div>
    );
}

export default ListComponent;