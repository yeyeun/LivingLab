import { useParams } from 'react-router-dom';
import ModifyComponent from '../../components/shareRoom/ModifyComponent';

const ModifyPage = () => {
  const {roomNo} = useParams();
  return (
    <ModifyComponent roomNo={roomNo}/>
  );
};

export default ModifyPage;
