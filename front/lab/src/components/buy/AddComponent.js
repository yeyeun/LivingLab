import React, { useState, useRef } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { postAddBuy } from '../../api/buyApi';
import ResultModal from '../common/ResultModal';

const initState = {
    user_id: 'exampleUserId',
    nickname: 'exampleNickname',
    title: '',
    location: '',
    content: '',
    buyCategory: '',
    max: 0,
    current: 1,
    deadline: '',
    buyHit: 0,
    files: [],
}

const AddComponent = () => {
    const { moveToList } = useCustomMove();
    const [postImage, setPostImage] = useState(null);
    const [postImageFile, setPostImageFile] = useState(null); // 이미지 파일 상태 추가
    const [buy, setBuy] = useState({ ...initState });
    const [result, setResult] = useState(null);
    const [addResultModal, setAddResultModal] = useState(null);
    const imgRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPostImage(URL.createObjectURL(file));
            setPostImageFile(file); 
        }
    };

    const handleRemoveImage = () => {
        setPostImage(null);
        setPostImageFile(null); 
        if (imgRef.current) {
            imgRef.current.value = null;
        }
    };

    const handleChangeBuy = (e) => {
        buy[e.target.name] = e.target.value;
        setBuy({ ...buy });
    };

    const handleClickAdd = async () => {
        if (!buy.buyCategory) {
            setAddResultModal("카테고리를 선택해주세요");
            return;
        }
        if (!buy.title || !buy.content) {
            setAddResultModal("제목과 내용을 입력해주세요");
            return;
        }
        if (!postImageFile) {
            setAddResultModal("이미지를 등록해주세요");
            return;
        }

        const formData = new FormData();
        if (postImageFile) {
            formData.append("files", postImageFile); 
        }

        formData.append("user_id", buy.user_id);
        formData.append("nickname", buy.nickname);
        formData.append("title", buy.title);
        formData.append("location", buy.location);
        formData.append("content", buy.content);
        formData.append("buyCategory", buy.buyCategory);
        formData.append("max", buy.max);
        formData.append("current", buy.current);
        formData.append("deadline", buy.deadline);
        formData.append("buyHit", buy.buyHit);

        postAddBuy(formData);
        setResult("게시글이 등록되었습니다");

        }

        const closeModal = () => {
            setResult(null);
            moveToList();
    };

    return (
        <div>
            <div className="team-category-container">
                공동구매 | 글 작성
            </div>
            <div className="detail-container">
                <div>
                    <div className="image-upload">
                        {!postImage ? (
                            <>
                                <label className="thumbnail-label" htmlFor="thumbnail">이미지 첨부</label>
                                <input
                                    className="thumbnail-input"
                                    type="file"
                                    accept="image/*"
                                    id="thumbnail"
                                    ref={imgRef}
                                    onChange={handleImageChange}
                                />
                            </>
                        ) : (
                            <div className="image-preview-container">
                                <img src={postImage} alt="미리보기" className="image-preview" />
                                <button className="remove-image-button" onClick={handleRemoveImage}>&times;</button>
                            </div>
                        )}
                    </div>
                    <div className="add-container"></div>
                    <div className="add-container">
                        <select id="buyCategory" name="buyCategory" className="select px-2" value={buy.buyCategory} onChange={handleChangeBuy}>
                            <option disabled hidden value="">카테고리 선택</option>
                            <option value="1">배달음식</option>
                            <option value="2">생필품</option>
                            <option value="3">식료품</option>
                            <option value="4">가구/가전</option>
                            <option value="5">기타</option>
                        </select>
                        <div className="flex justify-end w-1/2">
                            <input type="number" name="max" id="max" value={buy.max} onChange={handleChangeBuy} className="input-text p-2 max-person" placeholder="인원" />
                            <input
                                type="date"
                                required
                                aria-required="true"
                                data-placeholder="마감일"
                                name="deadline" id="deadline" value={buy.deadline}
                                onChange={handleChangeBuy}
                                className="date-picker p-2"
                            />
                        </div>
                    </div>
                    <input type="text" name="title" id="title" value={buy.title} onChange={handleChangeBuy} placeholder="제목을 입력하세요." className="input-text p-2" />
                    <div className="add-container">
                        <div className="detail-box p-2">주소 찾기 클릭!</div>
                        <button className="button-part ml-2" onClick={handleClickAdd}>주소 찾기</button>
                    </div>
                    <textarea name="content" id="content" value={buy.content} onChange={handleChangeBuy} placeholder="내용을 입력하세요." className="input-textarea p-2"></textarea>
                    <div className="detail-footer text-center">
                        <div></div>
                        <div>
                            <button className="button-part mr-3" onClick={handleClickAdd}>등록하기</button>
                            <button className="button-return" onClick={() => moveToList()}>목록</button>
                        </div>
                    </div>
                </div>
                {result && <ResultModal title={'알림'} content={`${result}`} callbackFn={closeModal} />}
                {addResultModal && (
                    <ResultModal title={'알림'} content={`${addResultModal}`} callbackFn={() => setAddResultModal(null)} />
                )}
            </div>
        </div>
    );
};

export default AddComponent;
