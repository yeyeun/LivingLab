import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = () => {
  // 스크롤을 최상단으로 이동시키는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤 이동
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={scrollToTop}
        className="bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 transition duration-300 text-2xl"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
