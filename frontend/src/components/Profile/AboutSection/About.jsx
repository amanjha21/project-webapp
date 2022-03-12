import "./About.css";
import Member from "../Members/Member";
import { useState } from "react";

const About = ({ data }) => {
  const [limit, setLimit] = useState(5);
  const viewMoreHandler = () => {
    setLimit((previousLimit) => previousLimit + 5);
  };

  return (
    <>
      <div className="about-container">
        <div className="about-team-head">Team Members</div>
        {data.map((member, i) => {
          if (i < limit)
            return (
              <Member
                name={member.name}
                imgUrl={member.imageUrl}
                role={member.role || ""}
                key={i}
              />
            );
          else return "";
        })}
        {data.length > 5 && limit < data.length && (
          <div className="about-view-container">
            <button className="button-view" onClick={viewMoreHandler}>
              View more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
