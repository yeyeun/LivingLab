import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Loading = <div>Loading...</div>;
const MyChat = lazy(() => import('../../pages/myPage/chat/MyChatPage'));

const infoRouter = () => {
  return [
    {
      path: 'activity',
      element: (
        <Suspense fallback={Loading}>
          <MyChat />
        </Suspense>
      ),
    },
  ];
};

export default infoRouter;
