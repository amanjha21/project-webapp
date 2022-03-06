import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

const UserProfile = () => {
  const userList = [
    {
      profileImage:
        "https://w7.pngwing.com/pngs/396/63/png-transparent-rick-morty-illustration-rick-sanchez-morty-smith-rick-and-morty-season-3-television-show-adult-swim-rick-and-morty-television-child-face.png",
      name: "Vinamra Singh",
      roll: "2019UGCS115",
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
