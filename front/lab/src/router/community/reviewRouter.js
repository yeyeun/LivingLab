import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const ReviewList = lazy(()=> import("../../pages/community/review/ListPage"));
const ReviewRead = lazy(()=> import("../../pages/community/review/ReadPage"));
const ReviewAdd = lazy(()=> import("../../pages/community/review/AddPage"));
const ReviewModify = lazy(()=> import("../../pages/community/review/ModifyPage"));

const reviewRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><ReviewList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:commNo",
            element: <Suspense fallback={Loading}><ReviewRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><ReviewAdd/></Suspense>
        },
        {
            path: "modify/:commNo",
            element: <Suspense fallback={Loading}><ReviewModify/></Suspense>
        },
    ]
}

export default reviewRouter;