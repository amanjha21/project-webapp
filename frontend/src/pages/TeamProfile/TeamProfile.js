import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

import { useDispatch, useSelector } from "react-redux";
import { getTeamById } from "../../redux/TeamProfile";
import { useEffect } from "react";

const TeamProfile = () => {
  const teamId = "6203f6bf194afa73f40c5f6a";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamById(teamId));
  }, []);

  const teamArray = useSelector((state) => {
    return state.teamProfile.data.filter((team) => team._id === teamId);
  });

  const team = teamArray[0];

  return (
    <>
      {team && (
        <>
          <div className="user-profile-grid-container">
            <div className="navbar-grid">
              <Navbar />
            </div>
            <div className="profile-card-grid">
              <Profile
                profileImage={team.imageUrl}
                name={team.name}
                roll=""
                organization={team.organization}
              />
            </div>
            <div className="profile-navbar-grid">
              <ProfileNavbar type="team" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeamProfile;
