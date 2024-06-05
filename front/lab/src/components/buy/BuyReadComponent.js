import { useEffect, useState } from "react"
import { API_SERVER_HOST, getOne } from "../../api/buyApi";
import useCustomMove from "../../hooks/useCustomMove"


const initState = {
    buyNo: 0,
    title: '',
    location: '',
    content: '',
    category: '',
    max: 0,
    current: 0,
    deadline: '',
    uploadFileNames: []
}

const host = API_SERVER_HOST

const BuyReadComponent = ({ buyNo }) => {
    const [buy, setBuy] = useState(initState)
    const { moveToList, moveToModify } = useCustomMove()

    useEffect(() => {
        getOne(buyNo).then(data => {
            console.log(data)
            setBuy(data)
        })
    }, [buyNo])

    return (
        <div>
            <div className="flex justify-between">
                <div className="my-5 mx-5">모집 상황</div>
                <div className="my-5 mx-5">{buy.deadline} 까지</div>
            </div>
            <div className="image-upload">
                {buy.uploadFileNames.map((imgFile, i) =>
                    <img
                        alt="buy"
                        key={i}
                        src={`${host}/api/buy/display/${imgFile}`} />
                )}
            </div>
            <div className="text-center my-5">
                <span className="tag-button">카테고리: 
                    {buy.buyCategory === '1' && '구매'}
                    {buy.buyCategory === '2' && '판매'}
                    {buy.buyCategory === '3' && '교환'}
                    {buy.buyCategory === '4' && '나눔'}</span>
                <span className="tag-button">마감일: {buy.deadline}</span>
            </div>
            <div className="detail-box">제목: {buy.title}</div>
            <div className="detail-box">장소: {buy.location}</div>
            <div className="detail-box">작성자: {buy.nickname}</div>


            <div className="detail-box2">내용: {buy.content}</div>
            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToList()}>
                    공동구매
                </button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={() => moveToModify(buyNo)}>
                    수정하기
                </button>
            </div>
        </div>


    );

}

export default BuyReadComponent;