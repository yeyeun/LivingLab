import Header from "../components/menus/Header";
import Footer from "../components/menus/Footer";

const BasicLayout = ({children}) => {
    return(
        <div className="font-NotoSansKR">
            <Header/>
                {children}
            <Footer/>
        </div>
    );
}

export default BasicLayout;