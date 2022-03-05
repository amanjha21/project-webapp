import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

const UserProfile = () => {
  const userList = [
    {
      profileImage:
        "https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg",
      name: "Amisha Semwal",
      roll: "2019UGCS119",
      organization: "National Institute of Technology Jamshedpur",
    },
  ];
  return (
    <>
      <div className="user-profile-grid-container">
        <div className="navbar-grid">
          <Navbar />
        </div>
        <div className="profile-card-grid">
          {userList.map((user, i) => {
            return (
              <Profile
                profileImage={user.profileImage}
                name={user.name}
                roll={user.roll}
                organization={user.organization}
                key={i}
              />
            );
          })}
        </div>
        <div className="profile-navbar-grid">
          <ProfileNavbar />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
