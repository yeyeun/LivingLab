import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
//import DaumPostcode from 'react-daum-postcode';

const PostComponent = (props) => {
  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  // const address = props.address; // 추가
  const setAddress = props.setAddress; // 추가

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress); // 추가 : 이거 중요!
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete, left: 100, top: 15 });
  };

  return (
    <div>
      <button onClick={handleClick} className="rounded p-2 w-2/6 bg-gray-500 text-xm text-white" type="button">
        🔍︎ 주소 검색
      </button>
      {/* <DaumPostcode onComplete={handleComplete} /> */}
    </div>
  );
};

export default PostComponent;
