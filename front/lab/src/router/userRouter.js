import { Suspense, lazy } from 'react';

const Loading = <div>Loading...</div>;
const Join = lazy(() => import('../pages/user/JoinPage'));
const Login = lazy(() => import('../pages/user/LoginPage'));
const Logout = lazy(() => import('../pages/user/LogoutPage'));
const KakaoRedirect = lazy(() => import('../pages/user/KakaoRedirectPage'));

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
  ];
};
export default userRouter;
