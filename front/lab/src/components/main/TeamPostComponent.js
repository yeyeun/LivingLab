import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_SERVER_HOST, getLatestTeam } from '../../api/teamApi';
import PersonImg from '../../resources/images/person_num.png';


const host = API_SERVER_HOST;

const TeamPostComponent = () => {
    const [latestPosts, setLatestPosts] = useState([]);

    const checkDeadline = (deadline) => {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
        return currentDate > deadlineDate ? '모집 종료' : '모집 중';
    };

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const pageParam = { page: 1, size: 8 };
                const posts = await getLatestTeam(pageParam);
                console.log('Success:', posts);
                setLatestPosts(posts);
            } catch (error) {
                console.error('Error :', error);
            }
        };

        fetchLatestPosts();
    }, []);

    return (
        <div>
            {/* <div className="main-nextline2 "></div> */}
            <ul>
                {latestPosts.map((team, index) => (
                    <li key={team.buyNo} >
                        <div className="main-teamlist-container">
                            <div className="main-teamlist-title">
                                <Link to={`/team/read/${team.teamNo}`}>
                                    {team.title}
                                </Link>
                            </div>
                            <div className="main-teamlist-content">
                                <Link to={`/team/read/${team.teamNo}`}>
                                    {team.content}
                                </Link>
                            </div>
                            <span className="main-teamlist-number">
                                <img className="main-person-num" src={PersonImg} /> {team.current}/{team.max}
                            </span>
                        </div>
                        {index !== latestPosts.length - 1 && <hr className="latestPost-hr"></hr>}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default TeamPostComponent