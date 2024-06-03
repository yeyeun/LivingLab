import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const QnaList = lazy(()=> import("../../pages/community/qna/ListPage"));
const QnaRead = lazy(()=> import("../../pages/community/qna/ReadPage"));
const QnaAdd = lazy(()=> import("../../pages/community/qna/AddPage"));
const QnaModify = lazy(()=> import("../../pages/community/qna/ModifyPage"));

const qnaRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><QnaList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:commNo",
            element: <Suspense fallback={Loading}><QnaRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><QnaAdd/></Suspense>
        },
        {
            path: "modify/:commNo",
            element: <Suspense fallback={Loading}><QnaModify/></Suspense>
        },
    ]
}

export default qnaRouter;