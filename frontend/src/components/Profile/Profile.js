import "./Profile.css";
import { useState } from "react";
import { ImCog } from "react-icons/im";
import { IoMdAddCircle, IoMdExit } from "react-icons/io";

import Confirmation from "../Confirmation";

import Popup from "../Popup";
import EditProfileImage from "./EditProfileImage/EditProfileImage";
import EditProfile from "./EditProfile/EditProfile";

const Profile = () => {
  const [viewEditProfileImg, setViewEditProfileImg] = useState(false);
  const [viewEditProfile, setViewEditProfile] = useState(false);
  const [showAddMember, setshowAddMember] = useState(false);
  const [leaveTeam, setLeaveTeam] = useState(false);

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
        <div className="profile-card-leaveTeam">
          <button
            className="profile-card-btn leaveTeam-btn"
            onClick={setLeaveTeam}
          >
            Leave Team <IoMdExit className="leaveTeam-icon" />
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
      </div>
      <Confirmation
        visible={leaveTeam}
        setVisible={setLeaveTeam}
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

export default Profile;
