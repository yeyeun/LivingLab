import ListComponent from "../../../components/community/review/ListComponent";
import useCustomReview from "../../../hooks/useCustomReview";

const ListPage = () => {
  const {moveToAdd} = useCustomReview();

  return (
    <div className="text-xl p-4 flex-grow">
      <div className="m-auto bg-white w-4/5 rounded-md px-10 py-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300">리뷰게시판</div>
                <ListComponent/>
                <button type="button" className="float-right inline-block rounded bg-teal-400 px-6 pb-2 pt-2.5 text-base font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-teal-500 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-teal-600 motion-reduce:transition-none"
                onClick={()=>moveToAdd()}>
                  글쓰기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;