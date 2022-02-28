import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

const UserProfile = () => {
  return (
    <>
      <div className="user-profile-grid-container">
        <Navbar className="navbar-grid" />
        <Profile className="profile-grid" />
        <ProfileNavbar className="profile-navbar-grid" />
      </div>
    </>
  );
};

export default UserProfile;
