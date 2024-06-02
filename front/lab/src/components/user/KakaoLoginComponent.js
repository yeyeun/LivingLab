import { getKakaoLoginLink } from '../../api/kakaoApi';
import { Link } from 'react-router-dom';
import kakaoLoginWideImg from '../../resources/images/kakao_login_medium_wide.png';

const link = getKakaoLoginLink();

const KakaoLoginComponent = () => {
  return (
    <div className="flex flex-col">
      <div className="text-center text-blue-500">
        로그인시에 자동 가입처리 됩니다
      </div>
      <div className="flex justify-center w-full my-3">
        <Link to={link}>
          <img src={kakaoLoginWideImg} alt="kakaoLogin" />
        </Link>
      </div>
    </div>
  );
};

export default KakaoLoginComponent;
