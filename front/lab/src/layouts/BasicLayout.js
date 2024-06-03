import Header from '../components/menus/Header';
import Footer from '../components/menus/Footer';

const BasicLayout = ({ children }) => {
  return (
    <>
      <div className="font-NotoSansKR min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default BasicLayout;

// BasicLayout 컴포넌트 상단에 공통 메뉴와 링크,
// 아래로 페이지 컴포넌트 출력
// 'children' 속성 : 컴포넌트 내부에 다른 컴포넌트 적용
