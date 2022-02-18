import "./about.css";
import Member from "../members/member";
import { useState } from "react";

const About = () => {
  const memberList = [
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "Admin",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "Admin",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "Admin",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "Admin",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "Admin",
    },
    {
      name: "Vaibhav",
      imgUrl: "http://i.pravatar.cc/150?img=53",
      role: "Admin",
    },
  ];

  const [limit, setLimit] = useState(5);
  const viewMoreHandler = () => {
    setLimit((previousLimit) => previousLimit + 5);
  };

  return (
    <>
      <div>
        <h1 className="team-head">Team Members</h1>
      </div>
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
        <div className="view-container">
          <button
            className="default--btn button-view-more"
            onClick={viewMoreHandler}
          >
            view more
          </button>
        </div>
      )}
    </>
  );
};

export default About;
