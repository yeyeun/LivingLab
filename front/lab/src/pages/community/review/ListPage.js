import ListComponent from "../../../components/community/ListComponent";
import SearchComponent from "../../../components/common/SearchComponent";

const ListPage = () => {
  return (
    <div className="text-xl p-4 flex-grow">
      <div className="m-auto bg-slate-50 w-4/5 rounded-md px-10 py-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-2xl pl-2 my-2 border-l-4 font-Jua border-teal-300">리뷰게시판</div>
                <SearchComponent/>
                <table className="min-w-full text-center text-lg font-light text-surface dark:text-white">
                  <thead className="border-b-2 border-neutral-500 font-semibold dark:border-white/10">
                    <tr>
                      <th scope="col" className="w-2/12 py-4">카테고리</th>
                      <th scope="col" className="w-1/12 py-4">좋아요수</th>
                      <th scope="col" className="w-6/12 py-4">제목</th>
                      <th scope="col" className="w-1/12 py-4">날짜</th>
                      <th scope="col" className="w-2/12 py-4">작성자</th>
                    </tr>
                  </thead>
                  <ListComponent/>
                </table>

      </div>
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default ListPage;