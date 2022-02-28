import "./About.css";
import Member from "../Memberss/Member";
import { useState } from "react";

const About = () => {
  const memberList = [
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "admin",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "moderator",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "moderator",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "member",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "member",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "member",
    },
  ];

  const [limit, setLimit] = useState(5);
  const viewMoreHandler = () => {
    setLimit((previousLimit) => previousLimit + 5);
  };

  return (
    <>
      <div className="about-container">
        <div className="about-team-head">Team Members</div>
        {memberList.map((member, i) => {
          if (i < limit)
            return (
              <Member
                name={member.name}
                imgUrl={member.imgUrl}
                role={member.role}
                key={i}
              />
            );
          else return "";
        })}
        {memberList.length > 5 && limit < memberList.length && (
          <div className="about-view-container">
            <button className="button-view" onClick={viewMoreHandler}>
              view more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
