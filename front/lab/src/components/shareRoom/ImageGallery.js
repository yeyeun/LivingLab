// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import Slider from 'react-slick';

// // 모달 스타일 설정
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// // 이미지 리스트
// const images = shareRoom.uploadFileNames.map(imgFile => `${host}/api/shareRoom/display/${imgFile}`);

// function ImageGallery() {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [sliderSettings, setSliderSettings] = useState({
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   });

//   function openModal() {
//     setModalIsOpen(true);
//   }

//   function closeModal() {
//     setModalIsOpen(false);
//   }

//   return (
//     <div>
//       {images.map((imgFile, index) => (
//         <img
//           key={index}
//           src={imgFile}
//           onClick={openModal}
//           className="cursor-pointer"
//           alt="Thumbnail"
//         />
//       ))}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Image Carousel"
//       >
//         <Slider {...sliderSettings}>
//           {images.map((imgFile, index) => (
//             <div key={index}>
//               <img src={imgFile} alt={`Slide ${index}`} />
//             </div>
//           ))}
//         </Slider>
//         <button onClick={closeModal}>Close</button>
//       </Modal>
//     </div>
//   );
// }

// export default ImageGallery;
