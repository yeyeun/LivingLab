import { useParams } from 'react-router-dom';
import ModifyComponent from '../../components/market/ModifyComponent'

const ModifyPage = () => {
    const { marketNo } = useParams();
    return(
        <div>
            <ModifyComponent marketNo={marketNo}/>
        </div>
    ); 
}

export default ModifyPage;