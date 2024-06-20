import { useParams } from "react-router-dom";
import ReadComponent from "../../../components/community/tip/ReadComponent";

const ReadPage = () => {
  const {commNo} = useParams();
  return (
    <div className="text-xl flex-grow">
      <div className="m-auto bg-white w-5/6 rounded-md py-16">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="text-xl font-semibold pl-2 my-2 border-l-4 border-teal-300">자취 TIP 공유</div>
                <ReadComponent commNo={commNo}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPage;