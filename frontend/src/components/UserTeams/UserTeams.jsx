import SingleTeam from "./SingleTeam";
import { IoAddSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Confirmation from "../Confirmation";
import { defaultTeamNotFoundImgUrl } from "../../helpers/Constants";
import "./UserTeams.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authHeader } from "../../helpers/authHeader";
import { SERVER_ENDPOINT } from "../../helpers/Constants";
import { getNoticesByTeamId } from "../../redux/TeamNotice";
const UserTeams = ({ teamChangeHandler, page, defaultLimit }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState("");
  const userTeams = useSelector((state) => state.currentUser.data?.teams) || [];
  const isLoading = useSelector((state) => state.currentUser.isLoading);
  const error = useSelector((state) => state.currentUser.error);

  const selectTeamHandler = (i) => {
    if (selectedTeam === i) {
      setSelectedTeam(-1);
    } else setSelectedTeam(i);
  };

  const createTeamHandler = ({ data }) => {
    const teamData = new FormData();
    teamData.append("name", data);
    axios
      .post(`${SERVER_ENDPOINT}/team/`, teamData, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };
  useEffect(() => {
    if (selectedTeam === 0 || selectedTeam === -1) {
      teamChangeHandler(selectedTeam);
    } else {
      const teamId = userTeams[selectedTeam - 1]?._id;
      if (teamId) {
        dispatch(getNoticesByTeamId(teamId, page, defaultLimit));
        teamChangeHandler(teamId);
      }
    }
  }, [selectedTeam]);
  return (
    <>
      <div className="user-team-container rounded-corner">
        <div
          className="create-team team-single team-user rounded-corner"
          onClick={setVisible}
        >
          Create Team <IoAddSharp className="add-team-icon" />
        </div>
        <div
          className={`all-teams team-single rounded-corner ${
            selectedTeam === 0 ? "team-selected" : ""
          }`}
          onClick={() => selectTeamHandler(0)}
        >
          All Teams
        </div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {userTeams.map((team, i) => (
          <div
            className={`team-single  rounded-corner ${
              selectedTeam === i + 1 ? "team-selected" : ""
            }`}
            onClick={() => selectTeamHandler(i + 1)}
          >
            <SingleTeam
              key={i}
              teamId={team._id}
              name={team.name}
              imgUrl={team.imageUrl || defaultTeamNotFoundImgUrl}
            />
          </div>
        ))}
      </div>

      <Confirmation
        visible={visible}
        setVisible={setVisible}
        message="Enter Team Name"
        option="Create Team"
        onConfirm={createTeamHandler}
        input={{ placeholder: "New Team Name" }}
      />
    </>
  );
};

export default UserTeams;
