import SingleTeam from "./SingleTeam";
import "./UserTeams.css";
const UserTeams = () => {
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
  return (
    <>
      <div className="user-team-container rounded-corner">
        {teams.map((team, i) => (
          <SingleTeam key={i} name={team.name} imgUrl={team.imgUrl} />
        ))}
      </div>
    </>
  );
};

export default UserTeams;
