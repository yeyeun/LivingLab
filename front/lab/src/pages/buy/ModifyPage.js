import { useParams } from 'react-router-dom';
import ModifyComponent from "../../components/buy/ModifyComponent";

const ModifyPage = () => {
    const { buyNo } = useParams();

    return(
        <div>
            공동구매 글 수정 페이지
            <ModifyComponent buyNo={buyNo}/>
        </div>
    ); 
}

export default ModifyPage;