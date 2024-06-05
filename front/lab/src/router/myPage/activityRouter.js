import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Loading = <div>Loading...</div>;
const MyActivity = lazy(() => import('../../pages/myPage/activity/MyActivityPage'));

const infoRouter = () => {
  return [
    {
      path: 'activity',
      element: (
        <Suspense fallback={Loading}>
          <MyActivity />
        </Suspense>
      ),
    },
  ];
};

export default infoRouter;
