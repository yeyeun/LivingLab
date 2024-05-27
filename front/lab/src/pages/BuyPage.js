import BasicLayout from "../layouts/BasicLayout";
import BuyItem from "../components/products/BuyItem";

const BuyPage = () => {
    return(
        <div>
        <BasicLayout>
            <div className="text-xl p-4">
                <div className="m-auto bg-slate-200 w-2/5 rounded-md px-10 py-4">
                    <BuyItem/>
                    <BuyItem/>
                    <BuyItem/>
                    <BuyItem/>
                </div>
            </div>
        </BasicLayout>
        </div>
    );
}

export default BuyPage;