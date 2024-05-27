// 어떤 경로에 어떤 컴포넌트를 보여줄 것인지 결정
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>
const Main = lazy(()=> import("../pages/MainPage"));
const Buy = lazy(()=> import("../pages/BuyPage"));
const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "/buy",
        element: <Suspense fallback={Loading}><Buy/></Suspense>
    }

]);
export default root;