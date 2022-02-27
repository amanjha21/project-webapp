import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";

const UserProfile = () => {
  return (
    <>
      <div className="user-profile-grid-container">
        <Navbar className="navbar-grid" />
        <Profile className="profile-grid" />
      </div>
    </>
  );
};

export default UserProfile;
