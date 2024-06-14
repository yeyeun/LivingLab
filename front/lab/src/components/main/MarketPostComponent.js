import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_SERVER_HOST, getLatestMarket } from '../../api/marketApi';


const host = API_SERVER_HOST;

const MarketPostComponent = () => {
    const [latestPosts, setLatestPosts] = useState([]);

    // const checkDeadline = (deadline) => {
    //     const currentDate = new Date();
    //     const deadlineDate = new Date(deadline);
    //     return currentDate > deadlineDate ? '모집 종료' : '모집 중';
    // };

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const pageParam = { page: 1, size: 8 };
                const posts = await getLatestMarket(pageParam);
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
            <ul className="main-common-container">
                {latestPosts.slice(0, 2).map((market) => (
                    <li key={market.buyNo} className="main-marketlist">
                        <div className="main-marketlist-image">
                            <Link to={`/market/read/${market.marketNo}`}>
                                <img className="main-marketlist-thumbnail" src={`${host}/api/market/display/${market.uploadFileNames[0]}`} alt={market.title} />
                            </Link>
                        </div>
                        <div className="main-marketlist-title">
                            <Link to={`/market/read/${market.marketNo}`}>
                                {market.title}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="main-nextline"></div>
            <ul className="main-common-container">
                {latestPosts.slice(2, 4).map((market) => (
                    <li key={market.buyNo} className="main-marketlist">
                        <div className="main-marketlist-image">
                            <Link to={`/market/read/${market.marketNo}`}>
                                <img className="main-marketlist-thumbnail" src={`${host}/api/market/display/${market.uploadFileNames[0]}`} alt={market.title} />
                            </Link>
                        </div>
                        <div className="main-marketlist-title">
                            <Link to={`/market/read/${market.marketNo}`}>
                                {market.title}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

        </>
    )
}

export default MarketPostComponent