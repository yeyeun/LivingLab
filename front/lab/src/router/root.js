// 어떤 경로에 어떤 컴포넌트를 보여줄 것인지 결정
import { Suspense, lazy } from 'react'; // 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연코딩
import { createBrowserRouter } from 'react-router-dom';
import todoRouter from './todoRouter';
import productsRouter from './productsRouter';
import userRouter from './userRouter';
import buyRouter from './buyRouter';
import teamRouter from './teamRouter';
import marketRouter from './marketRouter';
import shareRoomRouter from './shareRoomRouter';
import communityRouter from './community/allRouter';

const Loading = <div>Loading...</div>; // 컴포넌트의 처리가 끝나지 않은 경우 화면에 'Loading...' 메시지 출력
const Main = lazy(() => import('../pages/MainPage'));
const BuyIndex = lazy(() => import('../pages/buy/IndexPage')); // 공동구매 페이지
const TeamIndex = lazy(() => import('../pages/team/IndexPage')); // 동네모임 페이지
const MarketIndex = lazy(() => import('../pages/market/IndexPage')); // 동네장터 페이지
const ShareRoomIndex = lazy(() => import('../pages/shareRoom/IndexPage')); // 자취방쉐어 페이지
const CommunityIndex = lazy(() => import('../pages/community/IndexPage')); // 커뮤니티 페이지

const TodoIndex = lazy(() => import('../pages/todo/IndexPage'));
const ProductsIndex = lazy(() => import('../pages/products/IndexPage'));

const root = createBrowserRouter([
  {
    path: '', // 경로가 '/' 혹은 아무것도 없을 때는 MainPage 컴포넌트를 보여줌
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: 'buy',
    element: (
      <Suspense fallback={Loading}>
        <BuyIndex />
      </Suspense>
    ),
    children: buyRouter(), //중첩 라우팅
  },
  {
    path: 'team',
    element: (
      <Suspense fallback={Loading}>
        <TeamIndex />
      </Suspense>
    ),
    children: teamRouter(),
  },
  {
    path: 'market',
    element: (
      <Suspense fallback={Loading}>
        <MarketIndex />
      </Suspense>
    ),
    children: marketRouter(),
  },
  {
    path: 'shareRoom',
    element: (
      <Suspense fallback={Loading}>
        <ShareRoomIndex />
      </Suspense>
    ),
    children: shareRoomRouter(),
  },
  {
    path: 'community',
    element: (
      <Suspense fallback={Loading}>
        <CommunityIndex />
      </Suspense>
    ),
    children: communityRouter(),
  },
  {
    path: 'todo',
    element: (
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>
    ),
    children: todoRouter(),
  },
  {
    path: 'products',
    element: (
      <Suspense fallback={Loading}>
        <ProductsIndex />
      </Suspense>
    ),
    children: productsRouter(),
  },
  {
    path: 'user',
    children: userRouter(),
  },
]);
export default root;
