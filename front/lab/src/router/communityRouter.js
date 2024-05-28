import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const CommunityList = lazy(()=> import("../pages/community/ListPage"));
const CommunityRead = lazy(()=> import("../pages/community/ReadPage"));
const CommunityAdd = lazy(()=> import("../pages/community/AddPage"));
const CommunityModify = lazy(()=> import("../pages/community/ModifyPage"));

const communityRouterRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><CommunityList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:commNo",
            element: <Suspense fallback={Loading}><CommunityRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><CommunityAdd/></Suspense>
        },
        {
            path: "modify/:commNo",
            element: <Suspense fallback={Loading}><CommunityModify/></Suspense>
        },
    ]
}

export default communityRouterRouter;