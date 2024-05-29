import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const BuyList = lazy(()=> import("../pages/buy/ListPage"));
const BuyRead = lazy(()=> import("../pages/buy/ReadPage"));
const BuyAdd = lazy(()=> import("../pages/buy/AddPage"));
const BuyModify = lazy(()=> import("../pages/buy/ModifyPage"));

const buyRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><BuyList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:buyNo",
            element: <Suspense fallback={Loading}><BuyRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><BuyAdd/></Suspense>
        },
        {
            path: "modify/:buyNo",
            element: <Suspense fallback={Loading}><BuyModify/></Suspense>
        },
    ]
}

export default buyRouter;