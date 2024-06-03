import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const TipList = lazy(()=> import("../../pages/community/tip/ListPage"));
const TipRead = lazy(()=> import("../../pages/community/tip/ReadPage"));
const TipAdd = lazy(()=> import("../../pages/community/tip/AddPage"));
const TipModify = lazy(()=> import("../../pages/community/tip/ModifyPage"));

const tipRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><TipList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:commNo",
            element: <Suspense fallback={Loading}><TipRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><TipAdd/></Suspense>
        },
        {
            path: "modify/:commNo",
            element: <Suspense fallback={Loading}><TipModify/></Suspense>
        },
    ]
}

export default tipRouter;