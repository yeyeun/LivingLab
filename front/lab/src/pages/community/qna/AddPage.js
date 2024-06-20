import AddComponent from "../../../components/community/qna/AddComponent";

const AddPage = () => {
  return (
    <div className="text-xl flex-grow">
      <div className="m-auto bg-white w-5/6 rounded-md py-16">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300">질문게시판</div>
                <AddComponent/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPage;