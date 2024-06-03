import { Suspense, lazy } from 'react'; // 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연코딩
import tipRouter from './tipRouter';
import qnaRouter from './qnaRouter';
import reviewRouter from './reviewRouter';
import helpRouter from './helpRouter';

const Loading = <div>Loading...</div>; // 컴포넌트의 처리가 끝나지 않은 경우 화면에 'Loading...' 메시지 출력
const TipList = lazy(() => import('../../pages/community/tip/ListPage')); // 자취 TIP 공유 페이지
const QnaList = lazy(() => import('../../pages/community/qna/ListPage')); // 질문게시판 페이지
const ReviewList = lazy(() => import('../../pages/community/review/ListPage')); //리뷰게시판 페이지
const HelpList = lazy(() => import('../../pages/community/help/ListPage')); // 도움요청 페이지

const allRouter = () => {
  return[
    {
      path: 'tip',
      element: <Suspense fallback={Loading}><TipList /></Suspense>,
      children: tipRouter(), //중첩 라우팅
    },
    {
      path: 'qna',
      element: <Suspense fallback={Loading}><QnaList /></Suspense>,
      children: qnaRouter(),
    },
    {
      path: 'review',
      element: <Suspense fallback={Loading}><ReviewList /></Suspense>,
      children: reviewRouter(),
    },
    {
      path: 'help',
      element: <Suspense fallback={Loading}><HelpList /></Suspense>,
      children: helpRouter(),
    },
  ]
}

export default allRouter;