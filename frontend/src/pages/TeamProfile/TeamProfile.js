import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getTeamById } from "../../redux/TeamProfile";
import { getNoticesByTeamId } from "../../redux/TeamNotice";

const TeamProfile = () => {
  const teamId = "6203f6bf194afa73f40c5f6a";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamById(teamId));
    dispatch(getNoticesByTeamId(teamId));
  }, []);

  const teamArray = useSelector((state) => {
    return state.teamProfile.data.filter((team) => team._id === teamId);
  });

  const team = teamArray[0];

  const notices = useSelector((state) => state.teamNotices.data);

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
                organization=""
              />
            </div>
            <div className="profile-navbar-grid">
              <ProfileNavbar type="team" data={notices} about="" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeamProfile;
