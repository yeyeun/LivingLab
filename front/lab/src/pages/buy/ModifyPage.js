import { useParams } from 'react-router-dom';
import ModifyComponent from "../../components/buy/ModifyComponent";

const ModifyPage = () => {
    const { buyNo } = useParams();

    return(
        <div>
            <ModifyComponent buyNo={buyNo}/>
        </div>
    ); 
}

export default ModifyPage;