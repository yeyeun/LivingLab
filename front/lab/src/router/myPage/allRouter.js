import { Suspense, lazy } from 'react'; // 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연코딩
import activityRouter from './activityRouter';
import chatRouter from './chatRouter';
import infoRouter from './infoRouter';

const Loading = <div>Loading...</div>; // 컴포넌트의 처리가 끝나지 않은 경우 화면에 'Loading...' 메시지 출력
const MyActivity = lazy(() => import('../../pages/myPage/activity/MyActivityPage')); //
const MyChat = lazy(() => import('../../pages/myPage/chat/MyChatPage')); //
const MyInfo = lazy(() => import('../../pages/myPage/info/MyInfoPage')); //
const MyInfoModify = lazy(() => import('../../pages/myPage/info/MyInfoModifyPage')); //

const allRouter = () => {
  return [
    {
      path: 'activity',
      element: (
        <Suspense fallback={Loading}>
          <MyActivity />
        </Suspense>
      ),
      children: activityRouter(), //중첩 라우팅
    },
    {
      path: 'chat',
      element: (
        <Suspense fallback={Loading}>
          <MyChat />
        </Suspense>
      ),
      children: chatRouter(),
    },
    {
      path: 'info',
      element: (
        <Suspense fallback={Loading}>
          <MyInfo />
        </Suspense>
      ),
      children: infoRouter(),
    },
    {
      path: 'info/modify',
      element: (
        <Suspense fallback={Loading}>
          <MyInfoModify />
        </Suspense>
      ),
      children: infoRouter(),
    },
  ];
};

export default allRouter;
