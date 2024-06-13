import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const ShareRoomList = lazy(()=> import("../pages/shareRoom/ListPage"));
const ShareRoomRead = lazy(()=> import("../pages/shareRoom/ReadPage"));
const ShareRoomAdd = lazy(()=> import("../pages/shareRoom/AddPage"));
const ShareRoomModify = lazy(()=> import("../pages/shareRoom/ModifyPage"));

const shareRoomRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><ShareRoomList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:roomNo",
            element: <Suspense fallback={Loading}><ShareRoomRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><ShareRoomAdd/></Suspense>
        },
        {
            path: "modify/:roomNo",
            element: <Suspense fallback={Loading}><ShareRoomModify/></Suspense>
        },
    ]
}

export default shareRoomRouter;