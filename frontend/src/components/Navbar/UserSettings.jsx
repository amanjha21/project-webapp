import { useState } from "react";
import Popup from "../Popup";
import EditProfile from "../Profile/EditProfile/EditProfile";
import { logout } from "../../auth";
const UserSettings = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  const editProfileHandler = (e) => {
    e.preventDefault();
    setShowEditProfile(true);
    console.log("profileHandler");
  };
  const options = [
    { name: "Edit Profile", clickHandler: editProfileHandler },
    {
      name: "Logout",
      clickHandler: logoutHandler,
    },
  ];
  return (
    <>
      <div className="user-settings-container rounded-corner">
        {options &&
          options.map((option, i) => (
            <div
              className="user-settings-option"
              key={i}
              onClick={option.clickHandler}
            >
              {option.name}
            </div>
          ))}
      </div>
      <Popup visible={showEditProfile} setVisible={setShowEditProfile}>
        <EditProfile />
      </Popup>
    </>
  );
};

export default UserSettings;
