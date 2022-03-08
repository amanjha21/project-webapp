import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/UserProfile";
import { useEffect } from "react";

const UserProfile = () => {
  const userId = "62041a8360c7f0fb3032531d";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(userId));
  }, []);

  const userArray = useSelector((state) => {
    return state.userProfile.data.filter((user) => user._id === userId);
  });
  const user = userArray[0];

  return (
    <>
      {user && (
        <>
          <div className="user-profile-grid-container">
            <div className="navbar-grid">
              <Navbar />
            </div>
            <div className="profile-card-grid">
              <Profile
                profileImage={user.imageUrl}
                name={user.name}
                roll={user.email.split("@")[0]}
                organization={user.teams[0].name}
              />
            </div>
            <div className="profile-navbar-grid">
              <ProfileNavbar />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
