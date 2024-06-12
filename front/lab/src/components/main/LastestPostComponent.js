import React, { useEffect, useState } from 'react';
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

  return (
    <div className='latestPost-list '>
      <ul className='latestPost-list'>
        {latestPosts.map((post, index) => (
          <li key={post.commNo}>
            <div className="latestPost-container">
              <div className='w-1/5 ml-3'>
                <span className="latestPost-type"> 
                  {post.type === '1' && '자취TIP공유'}
                  {post.type === '2' && '질문게시판'}
                  {post.type === '3' && '리뷰게시판'}
                  {post.type === '4' && '도움요청'}
                </span>
              </div>
              <div>
                <span>{post.title}</span>
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
