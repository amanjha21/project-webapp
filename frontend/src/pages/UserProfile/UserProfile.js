import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

const UserProfile = () => {
  return (
    <>
      <div className="user-profile-grid-container">
        <div className="navbar-grid">
          <Navbar />
        </div>
        <div className="profile-card-grid">
          <Profile />
        </div>
        <div className="profile-navbar-grid">
          <ProfileNavbar />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
