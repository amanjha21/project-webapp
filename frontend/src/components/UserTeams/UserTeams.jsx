import SingleTeam from "./SingleTeam";
import { IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import Confirmation from "../Confirmation";

import "./UserTeams.css";
const UserTeams = () => {
  const [visible, setVisible] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState("");

  const teams = [
    {
      name: "Team1",
      imgUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Team2",
      imgUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Team3",
      imgUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Team4",
      imgUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
    {
      name: "Team5",
      imgUrl:
        "http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg",
    },
  ];
  const selectTeamHandler = (i) => {
    if (selectedTeam === i) {
      setSelectedTeam(teams.length + 1);
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
        {teams.map((team, i) => (
          <div
            className={`team-single  rounded-corner ${
              selectedTeam === i + 1 ? "team-selected" : ""
            }`}
            onClick={() => selectTeamHandler(i + 1)}
          >
            <SingleTeam key={i} name={team.name} imgUrl={team.imgUrl} />
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
