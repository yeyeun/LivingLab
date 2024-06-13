import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_SERVER_HOST, getLatestBuy } from '../../api/buyApi';


const host = API_SERVER_HOST;

const BuyPostComponent = () => {
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
                const posts = await getLatestBuy(pageParam);
                console.log('Success:', posts);
                setLatestPosts(posts);
            } catch (error) {
                console.error('Error :', error);
            }
        };

        fetchLatestPosts();
    }, []);

    return (
        <>
            <ul className="main-buylist-container">
                {latestPosts.slice(0, 4).map((buy) => (
                    <li className="main-buylist">
                        <div className="main-buylist-image">
                            <Link to={`/buy/read/${buy.buyNo}`}>
                                <img className="main-buylist-thumbnail" src={`${host}/api/buy/display/${buy.uploadFileNames[0]}`} alt={buy.title} />
                            </Link>
                            <div className="main-buylist-recruit">{checkDeadline(buy.deadline)}</div>
                        </div>
                        <div className="main-buylist-title">
                            <Link to={`/buy/read/${buy.buyNo}`}>
                                {buy.title}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="main-nextline"></div>
            <ul className="main-buylist-container">
                {latestPosts.slice(4, 8).map((buy) => (
                    <li className="main-buylist">
                        <div className="main-buylist-image">
                            <Link to={`/buy/read/${buy.buyNo}`} >
                                <img className="main-buylist-thumbnail" src={`${host}/api/buy/display/${buy.uploadFileNames[0]}`} alt={buy.title} />
                            </Link>
                            <div className="main-buylist-recruit">{checkDeadline(buy.deadline)}</div>
                        </div>
                        <div className="main-buylist-title">
                            <Link to={`/buy/read/${buy.buyNo}`}>
                                {buy.title}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default BuyPostComponent