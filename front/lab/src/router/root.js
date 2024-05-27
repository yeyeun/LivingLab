// 어떤 경로에 어떤 컴포넌트를 보여줄 것인지 결정
import { Suspense, lazy } from "react"; // 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연코딩
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";

const Loading = <div>Loading...</div>; // 컴포넌트의 처리가 끝나지 않은 경우 화면에 'Loading...' 메시지 출력
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"));

const root = createBrowserRouter([
  {
    path: "", // 경로가 '/' 혹은 아무것도 없을 때는 MainPage 컴포넌트를 보여줌
    // 지연로딩
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "todo",
    element: (
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>
    ),
    children: todoRouter(),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={Loading}>
        <ProductsIndex />
      </Suspense>
    ),
    children: productsRouter(),
  },
  {
    path: "member",
    children: memberRouter(),
  },
]);
export default root;
