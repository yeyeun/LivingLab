import { Suspense, lazy } from 'react'; // 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연코딩
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>; // 컴포넌트의 처리가 끝나지 않은 경우 화면에 'Loading...' 메시지 출력
const TipList = lazy(() => import('../pages/community/tip/ListPage')); // 자취 TIP 공유 페이지
const TipRead = lazy(()=> import("../pages/community/tip/ReadPage"));
const TipAdd = lazy(()=> import("../pages/community/tip/AddPage"));
const TipModify = lazy(()=> import("../pages/community/tip/ModifyPage"));

const QnaList = lazy(() => import('../pages/community/qna/ListPage')); // 질문게시판 페이지
const QnaRead = lazy(()=> import("../pages/community/qna/ReadPage"));
const QnaAdd = lazy(()=> import("../pages/community/qna/AddPage"));
const QnaModify = lazy(()=> import("../pages/community/qna/ModifyPage"));

const ReviewList = lazy(() => import('../pages/community/review/ListPage')); //리뷰게시판 페이지
const ReviewRead = lazy(()=> import("../pages/community/review/ReadPage"));
const ReviewAdd = lazy(()=> import("../pages/community/review/AddPage"));
const ReviewModify = lazy(()=> import("../pages/community/review/ModifyPage"));

const HelpList = lazy(() => import('../pages/community/help/ListPage')); // 도움요청 페이지
const HelpRead = lazy(()=> import("../pages/community/help/ReadPage"));
const HelpAdd = lazy(()=> import("../pages/community/help/AddPage"));
const HelpModify = lazy(()=> import("../pages/community/help/ModifyPage"));

const allRouter = () => {
  return[
    // ********자취 TIP 게시판*********
    {
      path: 'tip/list',
      element: <Suspense fallback={Loading}><TipList /></Suspense>
    },
    {
      path:"",
      element: <Navigate replace to="tip/list"/>
    },
    {
      path:"tip",
      element: <Navigate replace to="tip/list"/>
    },
    {
      path: "tip/read/:commNo",
      element: <Suspense fallback={Loading}><TipRead/></Suspense>
    },
    {
      path: "tip/add",
      element: <Suspense fallback={Loading}><TipAdd/></Suspense>
    },
    {
      path: "tip/modify/:commNo",
      element: <Suspense fallback={Loading}><TipModify/></Suspense>
    },
    
    // ********질문게시판*********
    {
      path: "qna/list",
      element: <Suspense fallback={Loading}><QnaList/></Suspense>
    },
    {
      path:"qna",
      element: <Navigate replace to="qna/list"/>
    },
    {
      path: "qna/read/:commNo",
      element: <Suspense fallback={Loading}><QnaRead/></Suspense>
    },
    {
      path: "qna/add",
      element: <Suspense fallback={Loading}><QnaAdd/></Suspense>
    },
    {
      path: "qna/modify/:commNo",
      element: <Suspense fallback={Loading}><QnaModify/></Suspense>
    },

    // ********리뷰 게시판*********
    {
      path: "review/list",
      element: <Suspense fallback={Loading}><ReviewList/></Suspense>
    },
    {
      path:"review",
      element: <Navigate replace to="review/list"/>
    },
    {
      path: "review/read/:commNo",
      element: <Suspense fallback={Loading}><ReviewRead/></Suspense>
    },
    {
      path: "review/add",
      element: <Suspense fallback={Loading}><ReviewAdd/></Suspense>
    },
    {
      path: "review/modify/:commNo",
      element: <Suspense fallback={Loading}><ReviewModify/></Suspense>
    },
    // ********도움요청 게시판*********
    {
      path: "help/list",
      element: <Suspense fallback={Loading}><HelpList/></Suspense>
    },
    {
      path:"help",
      element: <Navigate replace to="help/list"/>
    },
    {
      path: "help/read/:commNo",
      element: <Suspense fallback={Loading}><HelpRead/></Suspense>
    },
    {
      path: "help/add",
      element: <Suspense fallback={Loading}><HelpAdd/></Suspense>
    },
    {
      path: "help/modify/:commNo",
      element: <Suspense fallback={Loading}><HelpModify/></Suspense>
    },
  ]
}

export default allRouter;