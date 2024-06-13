import { useParams } from 'react-router-dom';
import ModifyComponent from '../../components/team/ModifyComponent'

const ModifyPage = () => {
    const { teamNo } = useParams();
    return(
        <div>
            <ModifyComponent teamNo={teamNo}/>
        </div>
    ); 
}

export default ModifyPage;