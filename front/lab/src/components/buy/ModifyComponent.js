import React, { useState, useRef } from 'react';
import useCustomMove from '../../hooks/useCustomMove';



const initState = {
    buyNo: 0,
    title: '',
    location: '',
    content: '',
    category: '',
    max: 0,
    current: 0,
    deadline: '',
    uploadFileNames: [],
  };

const ModifyComponent = ({buyNo}) => {
    const { moveToList, moveToRead } = useCustomMove();
    const [postImage, setPostImage] = useState(null);
    const imgRef = useRef(null);
    const [buy, setBuy] = useState(initState);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPostImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setPostImage(null);
        if (imgRef.current) {
            imgRef.current.value = null;
        }
    };

    return (
        <div>
            <div className="team-category-container">
                공동구매 | 글 수정
            </div>
            <div className="detail-container">
                <div>
                    <div className="image-upload">
                        {!postImage ? (
                            <form>
                                <label className="thumbnail-label" htmlFor="thumbnail">이미지 첨부</label>
                                <input
                                    className="thumbnail-input"
                                    type="file"
                                    accept="image/*"
                                    id="thumbnail"
                                    ref={imgRef}
                                    onChange={handleImageChange}
                                />
                            </form>
                        ) : (
                            <div className="image-preview-container">
                                <img src={postImage} alt="Preview" className="image-preview" />
                                <button className="remove-image-button" onClick={handleRemoveImage}>X</button>
                            </div>
                        )}
                    </div>
                    <div className="add-container">
                        <select className="select p-2">
                            <option disabled hidden selected>카테고리 선택</option>
                            <option>배달음식</option>
                            <option>생필품</option>
                            <option>식료품</option>
                            <option>가구/가전</option>
                            <option>기타</option>
                        </select>
                        <input
                            type="date"
                            required
                            aria-required="true"
                            data-placeholder="마감일 지정"
                            className="date-picker p-2"
                        />
                    </div>
                    <input type="text" placeholder="제목을 입력하세요." className="input-text p-2" value={buy.title} />
                    <div className="detail-box p-2">주소 지정 </div>
                    <textarea placeholder="내용을 입력하세요." className="input-textarea p-2"></textarea>
                    <div className="detail-footer text-center">
                        <div></div>
                        <div>
                            <button className="button-part mr-3" onClick={() => moveToRead()}>수정하기</button>
                            <button className="button-return" onClick={() => moveToList()}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyComponent;
