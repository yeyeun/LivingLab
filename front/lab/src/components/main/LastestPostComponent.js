import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatest } from '../../api/communityApi';

function LatestPostComponent() {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const pageParam = { page: 1, size: 8 }; // 페이지네이션 파라미터 추가
        const posts = await getLatest(pageParam);
        console.log('Fetched latest posts:', posts); // 콘솔 출력 추가
        setLatestPosts(posts);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  const typeColor = (type) => {
    switch (type) {
      case '1':
        return 'type1';
      case '2':
        return 'type2';
      case '3':
        return 'type3';
      case '4':
        return 'type4';
      default:
        return '';
    }
  };

  const toCommunity = (type) => {
    switch (type) {
      case '1':
        return '/community/tip/list';
      case '2':
        return '/community/qna/list';
      case '3':
        return '/community/review/list';
      case '4':
        return '/community/help/list';
      default:
        return '#';
    }
  };

  const toRead = (type, commNo) => {
    let typePath = '';
    switch (type) {
      case '1':
        typePath = 'tip';
        break;
      case '2':
        typePath = 'qna';
        break;
      case '3':
        typePath = 'review';
        break;
      case '4':
        typePath = 'help';
        break;
      default:
        typePath = '';
    }
    return `/community/${typePath}/read/${commNo}?page=1&size=10`;
  };

  return (
    <div className='latestPost-list '>
      <ul className='latestPost-list'>
        {latestPosts.map((post, index) => (
          <li key={post.commNo}>
            <div className="latestPost-container">
              <div className='w-1/5 ml-3'>
                <Link to={toCommunity(post.type)} className={`latestPost-type ${typeColor(post.type)}`}>
                  {post.type === '1' && '자취TIP공유'}
                  {post.type === '2' && '질문게시판'}
                  {post.type === '3' && '리뷰게시판'}
                  {post.type === '4' && '도움요청'}
                </Link>
              </div>
              <div>
                <Link to={toRead(post.type, post.commNo)} >
                  <span>{post.title}</span>
                </Link>
              </div>
              <span className="latestPost-hit ">{post.commHit}</span>
            </div>
            {index !== latestPosts.length - 1 && <hr className="latestPost-hr"></hr>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestPostComponent;
