import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Loading = <div>Loading...</div>;
const MyInfo = lazy(() => import('../../pages/myPage/info/MyInfoPage'));
//const MyInfoModify = lazy(() => import('../../pages/myPage/info/MyInfoModifyPage'));

const infoRouter = () => {
  return [
    {
      path: '',
      element: (
        <Suspense fallback={Loading}>
          <MyInfo />
        </Suspense>
      ),
    },
  ];
};

export default infoRouter;
