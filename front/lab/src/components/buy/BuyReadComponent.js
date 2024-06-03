import ListComponent from "./ListComponent";


const BuyReadComponent = () => {
    return (
        <div>
            <div className="flex justify-between">
                <div className="my-5 mx-5">모집 상황</div>
                <div className="my-5 mx-5">기간</div>
            </div>
            <div className="image-upload"></div>
            <div className="text-center my-5">
                <span className="tag-button">카테고리</span>
                <span className="tag-button">인원수</span>

            </div>
            <div className="detail-box">제목</div>
            <div className="detail-box">주소</div>
            <div className="detail-box">작성자</div>


            <div className="detail-box2">내용
            </div>

        </div>


    );

}

export default BuyReadComponent;