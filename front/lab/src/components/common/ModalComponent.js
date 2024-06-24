import React from 'react';
import { useEffect, useState } from 'react';
import ProfileComponent from './ProfileComponent';

const ModalComponent = ({ teamNo, show, onClose }) => {

  //   useEffect(() => {
  //     getPartUsers(teamNo).then((data) => {
  //       setPart(data);
  //     });
  //   }, [teamNo]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-close-button" onClick={onClose}>
            &times;
          </span>
          <h2>참여 인원(/)</h2>
        </div>
        <hr />
        <div className="modal-body">
          <div>
            <ProfileComponent />
            <ProfileComponent />
            <ProfileComponent />
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-button-enter">그룹채팅 참여</button>
          <button className="modal-button-exit">빠지기</button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
