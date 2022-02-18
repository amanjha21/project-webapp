import "./profile.css";
import { useState } from "react";

import Popup from "../Popup";
import ProfileNavbar from "./profileNavbar/profileNavbar";
import EditProfileImage from "./editProfileImage/editProfileImage";
import EditProfile from "./editProfile/editProfile";

const UserProfile = () => {
  const [viewEditProfileImg, setViewEditProfileImg] = useState(false);
  const [viewEditProfile, setViewEditProfile] = useState(false);

  return (
    <>
      <div className="profile-card js-profile-card">
        <div className="profile-card__img circle">
          <img
            className="profile__img"
            onClick={() => setViewEditProfileImg(true)}
            src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg"
            alt="profile card"
          />
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">Amisha semwal</div>
          <div className="profile-card__roll">2019ugcs118</div>
          <div className="profile-card__txt">
            <strong className="profile__desc">
              National Institute Of Technology Jamshedpur
            </strong>
          </div>

          <div className="profile-card-ctr">
            {/* <button className="default--btn button--blue js-message-btn">
              Add member
            </button> */}
            <button
              className="default--btn button--orange"
              onClick={() => setViewEditProfile(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div>
          <ProfileNavbar />
        </div>
      </div>
      <Popup visible={viewEditProfileImg} setVisible={setViewEditProfileImg}>
        <EditProfileImage />
      </Popup>
      <Popup visible={viewEditProfile} setVisible={setViewEditProfile}>
        <EditProfile />
      </Popup>
    </>
  );
};

export default UserProfile;
