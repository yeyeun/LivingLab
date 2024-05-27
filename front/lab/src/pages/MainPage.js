import BasicLayout from "../layouts/BasicLayout";
import MultipleItems from "../components/products/MultipleItems";

const MainPage = () => {
    return(
        <div className="flex flex-col">
        <BasicLayout>
            <div className="flex-grow text-2xl">
                <MultipleItems/>
            </div>
        </BasicLayout>
        </div>
    );
}

export default MainPage;