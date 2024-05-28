import BasicLayout from "../layouts/BasicLayout";
import BuyItem from "../components/products/BuyItem";

const BuyPage = () => {
    return(
        <div>
        <BasicLayout>
            <div className="text-xl p-4">
                <div className="m-auto bg-slate-200 w-2/5 rounded-md px-10 py-4">
                    <div className="relative flex mb-4">
                        <input type="search" className="relative m-0 -me-0.5 block flex-auto rounded-s border border-solid border-neutral-200 bg-gray-50 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                        placeholder="Search" aria-label="Search" aria-describedby="searchButton"/>
                        <button className="z-[2] inline-block rounded-e bg-teal-400 border-2 border-primary px-6 pb-[6px] pt-2 text-base font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
                        type="button" id="searchButton">검색</button>
                    </div>
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