import React from 'react';
import image from '../../resources/images/ex_profile.jpg';

const ProfileComponent = () => { 
    return(
        <div className="modal-profile-container">
            <div className="modal-profile-box">
                <img className="modal-profile-picture" alt="profile-picture" src={image}>
                </img>
            </div>
            <div className="modal-profile-name">이름</div>
        </div>

    );
}

export default ProfileComponent;
