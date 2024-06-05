import React, { useState } from 'react';
import ModalComponent from './ModalComponent';

const ReadComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (

        <div>
            <div className="team-category-container">
                <span className="team-category ">
                    카테고리
                </span>
            </div>
            <div className="detail-container">
                <div>
                    <div className="image-upload"></div>
                    <div className="detail-box">제목</div>
                    <div className="detail-box">주소</div>
                    <div className="detail-box">작성자</div>
                    <div className="detail-content">내용</div>
                    <div className="map-container">지도
                        <div className="map-draw"></div>
                    </div>
                    <div className="map-container text-center">
                        <button className="button-part"  onClick={handleOpenModal}>참여하기</button>
                    </div>
                </div>
            </div>
            <ModalComponent show={showModal} onClose={handleCloseModal} />
        </div>

    );

}

export default ReadComponent;