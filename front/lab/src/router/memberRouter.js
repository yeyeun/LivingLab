import { Suspense, lazy } from 'react';

const Loading = <div>Loading...</div>;
const Join = lazy(() => import('../pages/member/JoinPage'));
const Login = lazy(() => import('../pages/member/LoginPage'));
const Logout = lazy(() => import('../pages/member/LogoutPage'));

const memberRouter = () => {
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
  ];
};
export default memberRouter;
