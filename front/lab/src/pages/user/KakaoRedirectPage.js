// 인가 코드의 페이지 처리
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAccessToken, getUserWithAccessToken } from '../../api/kakaoApi';

const KakaoRedirectPage = (props) => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');

  // 카카오 api에 있는 데이터 호출
  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      getUserWithAccessToken(accessToken).then((result) => {
        console.log('----------------------------');
        console.log(result);
      });
    });
  }, [authCode]);

  return (
    <div>
      <div>kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
