import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/shareRoom/ReadComponent';

const ReadPage = () => {
  const {roomNo} = useParams();
  return (
    <ReadComponent roomNo={roomNo}/>
  );
};

export default ReadPage;
