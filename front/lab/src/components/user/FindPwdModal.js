const FindPwdModal = ({ title, isVisible, onClose, children }) => {
  return(
      <div
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
      className="z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20"
      onClick={onClose}
    >
      <div
        className="relative bg-white shadow opacity-100 w-1/4 rounded-md px-6 min-w-[300px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
      >
        <div className="w-full text-center bg-warming-400 mt-6 mb-6 pb-2 text-base border-b-2 border-gray-300">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
};

export default FindPwdModal;