import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getTeamById } from "../../redux/TeamProfile";
import { getNoticesByTeamId } from "../../redux/TeamNotice";
import { getUserByTeamId } from "../../redux/TeamMember";

const TeamProfile = () => {
  const teamId = "6203f6bf194afa73f40c5f6a";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamById(teamId));
    dispatch(getNoticesByTeamId(teamId));
    dispatch(getUserByTeamId(teamId));
  }, []);

  const teamArray = useSelector((state) => {
    return state.teamProfile.data.filter((team) => team._id === teamId);
  });

  const team = teamArray[0];

  const notices = useSelector((state) => {
    return state.teamNotices.data.filter((notice) => notice.team === teamId);
  });

  const teamMemberArray = useSelector((state) => {
    return state.teamMembers.data.filter((member) => member.teamId === teamId);
  });

  const teamMembers = teamMemberArray[0];

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
                organization={team.organization.name}
              />
            </div>
            <div className="profile-navbar-grid">
              <ProfileNavbar
                type="team"
                data={notices}
                about={teamMembers}
                teamId={teamId}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeamProfile;
