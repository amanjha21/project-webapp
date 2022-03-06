import SingleTeam from "./SingleTeam";
import { IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import Confirmation from "../Confirmation";
import { defaultTeamNotFoundImgUrl } from "../../helpers/Constants";
import "./UserTeams.css";
import { useSelector } from "react-redux";
const UserTeams = () => {
  const [visible, setVisible] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState("");
  const userTeams = useSelector((state) => state.currentUser.data?.teams) || [];
  const isLoading = useSelector((state) => state.currentUser.isLoading);
  const error = useSelector((state) => state.currentUser.error);

  const selectTeamHandler = (i) => {
    if (selectedTeam === i) {
      setSelectedTeam(userTeams.length + 1);
    } else setSelectedTeam(i);
  };
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
        onConfirm={(data) => console.log("Team Created", data)}
        input={{ placeholder: "New Team Name" }}
      />
    </>
  );
};

export default UserTeams;
