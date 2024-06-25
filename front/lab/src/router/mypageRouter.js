import { Suspense, lazy } from 'react'; // 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연코딩

const Loading = <div>Loading...</div>; // 컴포넌트의 처리가 끝나지 않은 경우 화면에 'Loading...' 메시지 출력
const MyActivity = lazy(() => import('../pages/myPage/activity/MyActivityPage'));
const MyActivityListPage = lazy(() => import('../pages/myPage/activity/MyActivityListPage'));
const MyChat = lazy(() => import('../pages/myPage/chat/MyChatPage'));
const MyInfo = lazy(() => import('../pages/myPage/info/MyInfoPage'));
const MyInfoModify = lazy(() => import('../pages/myPage/info/MyInfoModifyPage'));

const mypageRouter = () => {
  return [
    {
      path: 'activity',
      element: (
        <Suspense fallback={Loading}>
          <MyActivity />
        </Suspense>
      )
    },
    {
      path: 'activity/buy',
      element: (
        <Suspense fallback={Loading}>
          <MyActivityListPage type={`buy`}/>
        </Suspense>
      )
    },
    {
      path: 'activity/team',
      element: (
        <Suspense fallback={Loading}>
          <MyActivityListPage type={`team`}/>
        </Suspense>
      )
    },
    {
      path: 'activity/market',
      element: (
        <Suspense fallback={Loading}>
          <MyActivityListPage type={`market`}/>
        </Suspense>
      )
    },
    {
      path: 'activity/community',
      element: (
        <Suspense fallback={Loading}>
          <MyActivityListPage type={`community`}/>
        </Suspense>
      )
    },
    {
      path: 'activity/shareroom',
      element: (
        <Suspense fallback={Loading}>
          <MyActivityListPage type={`shareroom`}/>
        </Suspense>
      )
    },
    {
      path: 'chat',
      element: (
        <Suspense fallback={Loading}>
          <MyChat />
        </Suspense>
      )
    },
    {
      path: 'info',
      element: (
        <Suspense fallback={Loading}>
          <MyInfo />
        </Suspense>
      )
    },
    {
      path: 'info/modify',
      element: (
        <Suspense fallback={Loading}>
          <MyInfoModify />
        </Suspense>
      )
    },
  ];
};

export default mypageRouter;
