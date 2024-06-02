import { Suspense, lazy } from 'react';

const Loading = <div>Loading...</div>;
const Join = lazy(() => import('../pages/user/JoinPage'));
const Login = lazy(() => import('../pages/user/LoginPage'));
const Logout = lazy(() => import('../pages/user/LogoutPage'));
const KakaoRedirect = lazy(() => import('../pages/user/KakaoRedirectPage'));

const MyActivity = lazy(() => import('../pages/myPage/MyActivityPage'));
const MyChat = lazy(() => import('../pages/myPage/MyChatPage'));
const MyInfo = lazy(() => import('../pages/myPage/MyInfoPage'));
const MyInfoModify = lazy(() => import('../pages/myPage/MyInfoModifyPage'));

const userRouter = () => {
  return [
    {
      path: 'join',
      element: (
        <Suspense fallback={Loading}>
          <Join />
        </Suspense>
      ),
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: 'logout',
      element: (
        <Suspense fallback={Loading}>
          <Logout />
        </Suspense>
      ),
    },
    {
      path: 'kakao',
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: 'myActivity',
      element: (
        <Suspense fallback={Loading}>
          <MyActivity />
        </Suspense>
      ),
    },
    {
      path: 'myChat',
      element: (
        <Suspense fallback={Loading}>
          <MyChat />
        </Suspense>
      ),
    },
    {
      path: 'myInfo',
      element: (
        <Suspense fallback={Loading}>
          <MyInfo />
        </Suspense>
      ),
    },
    {
      path: 'myInfoModify',
      element: (
        <Suspense fallback={Loading}>
          <MyInfoModify />
        </Suspense>
      ),
    },
  ];
};
export default userRouter;
