import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/team/ReadComponent';

const ReadPage = () => {
  const { teamNo } = useParams();
  return (
    <>
      <div className="flex justify-center">
        <ReadComponent teamNo={teamNo} />
      </div>
    </>
  );
};

export default ReadPage;
