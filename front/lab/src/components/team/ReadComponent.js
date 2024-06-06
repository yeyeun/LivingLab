import { useEffect, useState } from "react"
import { API_SERVER_HOST, getOne } from "../../api/teamApi";
import useCustomMove from "../../hooks/useCustomMove"
import ModalComponent from '../common/ModalComponent';
import MapComponent from "../common/MapComponent";

const initState = {
    teamNo: 0,
    title: '',
    location: '',
    content: '',
    teamCategory: '',
    max: 0,
    current: 0,
    deadline: '',
    uploadFileNames: []
}

const host = API_SERVER_HOST


const ReadComponent = ({ teamNo }) => {
    const [team, setTeam] = useState(initState)
    const { moveToList, moveToModify } = useCustomMove()



    useEffect(() => {
        getOne(teamNo).then(data => {
            console.log(data)
            setTeam(data)
        })
    }, [teamNo])

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (

        <div>
            <div className="team-category-container">
                <span className="team-category ">
                    {team.teamCategory === '1' && '운동'}
                    {team.teamCategory === '2' && '문화생활'}
                    {team.teamCategory === '3' && '반려생활'}
                </span>
            </div>
            <div className="detail-container">
                <div>
                    <div className="image-upload">
                        {team.uploadFileNames.map((imgFile, i) =>
                            <img
                                alt="team"
                                key={i}
                                src={`${host}/api/team/display/${imgFile}`} />
                        )}
                    </div>
                    <div className="detail-box p-2">제목 : {team.title}</div>
                    <div className="detail-box p-2">주소 : {team.location}</div>
                    <div className="detail-box p-2">작성자 : {team.nickname}</div>
                    <div className="detail-content p-2">{team.content}</div>
                    <div className="map-container">지도
                        <div className="map-draw">
                            <MapComponent location={team.location}/>
                        </div>
                    </div>
                    <div className="map-container text-center">
                        <button className="button-part" onClick={handleOpenModal}>참여하기</button>
                    </div>
                </div>
            </div>
            <ModalComponent show={showModal} onClose={handleCloseModal} />
        </div>

    );

}

export default ReadComponent;