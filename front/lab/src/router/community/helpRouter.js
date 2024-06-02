import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const HelpList = lazy(()=> import("../../pages/community/help/ListPage"));
const HelpRead = lazy(()=> import("../../pages/community/help/ReadPage"));
const HelpAdd = lazy(()=> import("../../pages/community/help/AddPage"));
const HelpModify = lazy(()=> import("../../pages/community/help/ModifyPage"));

const helpRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><HelpList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:commNo",
            element: <Suspense fallback={Loading}><HelpRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><HelpAdd/></Suspense>
        },
        {
            path: "modify/:commNo",
            element: <Suspense fallback={Loading}><HelpModify/></Suspense>
        },
    ]
}

export default helpRouter;