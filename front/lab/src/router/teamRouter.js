import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const TeamList = lazy(()=> import("../pages/team/ListPage"));
const TeamRead = lazy(()=> import("../pages/team/ReadPage"));
const TeamAdd = lazy(()=> import("../pages/team/AddPage"));
const TeamModify = lazy(()=> import("../pages/team/ModifyPage"));

const teamRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><TeamList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:teamNo",
            element: <Suspense fallback={Loading}><TeamRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><TeamAdd/></Suspense>
        },
        {
            path: "modify/:teamNo",
            element: <Suspense fallback={Loading}><TeamModify/></Suspense>
        },
    ]
}

export default teamRouter;