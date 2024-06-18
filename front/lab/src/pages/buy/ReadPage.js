import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/buy/ReadComponent';

const ReadPage = () => {
  const { buyNo } = useParams();
  return (
    <div className="flex justify-center">
      <ReadComponent buyNo={buyNo} />
    </div>
  );
};

export default ReadPage;
