import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>
const MarketList = lazy(()=> import("../pages/market/ListPage"));
const MarketRead = lazy(()=> import("../pages/market/ReadPage"));
const MarketAdd = lazy(()=> import("../pages/market/AddPage"));
const MarketModify = lazy(()=> import("../pages/market/ModifyPage"));

const marketRouter = () => {
    return[
        {
            path: "list",
            element: <Suspense fallback={Loading}><MarketList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="list"/>
        },
        {
            path: "read/:marketNo",
            element: <Suspense fallback={Loading}><MarketRead/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><MarketAdd/></Suspense>
        },
        {
            path: "modify/:marketNo",
            element: <Suspense fallback={Loading}><MarketModify/></Suspense>
        },
    ]
}

export default marketRouter;