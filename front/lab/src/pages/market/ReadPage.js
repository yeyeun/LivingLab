import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/market/ReadComponent';

const ReadPage = () => {
  const { marketNo } = useParams();
  return (
    <div>
      <ReadComponent marketNo={marketNo} />
    </div>
  );
};

export default ReadPage;
