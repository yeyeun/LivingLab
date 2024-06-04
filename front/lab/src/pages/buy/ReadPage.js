import { useParams } from "react-router-dom";
import BuyReadComponent from "../../components/buy/BuyReadComponent";

const ReadPage = () => {
  const {buyNo} = useParams();
  return (
    <div className="detail-container">
      <BuyReadComponent buyNo={buyNo}/>

    </div>
  );
};

export default ReadPage;
