import "./profile.css";
import { useState } from "react";
import { ImCog } from "react-icons/im";
import { IoMdAddCircle, IoMdExit } from "react-icons/io";

import Confirmation from "../Confirmation";

import Popup from "../Popup";
import ProfileNavbar from "./profileNavbar/profileNavbar";
import EditProfileImage from "./editProfileImage/editProfileImage";
import EditProfile from "./editProfile/editProfile";

const UserProfile = () => {
  const [viewEditProfileImg, setViewEditProfileImg] = useState(false);
  const [viewEditProfile, setViewEditProfile] = useState(false);
  const [showAddMember, setshowAddMember] = useState(false);
  const [logout, setLogout] = useState(false);

  return (
    <>
      <div className="profile-card">
        <div className="profile-card__img circle">
          <img
            className="profile__img"
            onClick={() => setViewEditProfileImg(true)}
            src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg"
            alt="profile card"
          />
        </div>
        <div className="profile-card-logout">
          <button className="profile-card-btn logout-btn" onClick={setLogout}>
            Leave Team <IoMdExit className="logout-icon" />
          </button>
        </div>

        <div className="profile-card__cnt">
          <div className="profile-card__name">Amisha semwal</div>
          <div className="profile-card__roll">2019ugcs118</div>
          <div className="profile-card__txt">
            <strong className="profile__desc">
              National Institute Of Technology Jamshedpur
            </strong>
          </div>

          <div className="profile-card-ctr">
            <button
              className="profile-card-btn button--add"
              onClick={setshowAddMember}
            >
              Add User <IoMdAddCircle className="add-icon" />
            </button>
            <button
              className="profile-card-btn button--orange cursor"
              onClick={() => setViewEditProfile(true)}
            >
              Settings <ImCog className="setting-icon" />
            </button>
          </div>
        </div>
        <div>
          <ProfileNavbar />
        </div>
      </div>
      <Confirmation
        visible={logout}
        setVisible={setLogout}
        message="Are you Sure you want to leave this Team?"
        option="Confirm"
        onConfirm={() => console.log("Request Sent Successfully")}
      />
      <Popup visible={viewEditProfileImg} setVisible={setViewEditProfileImg}>
        <EditProfileImage />
      </Popup>
      <Popup visible={viewEditProfile} setVisible={setViewEditProfile}>
        <EditProfile />
      </Popup>
      <Confirmation
        visible={showAddMember}
        setVisible={setshowAddMember}
        message="Enter User's email address to send request"
        option="Send Request"
        onConfirm={() => console.log("Request Sent Successfully")}
        input={{ placeholder: "User Email" }}
      />
    </>
  );
};

export default UserProfile;
