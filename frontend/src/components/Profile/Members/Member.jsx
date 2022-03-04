import { useState } from "react";
import Options from "../../Options";
import Confirmation from "../../Confirmation";
import UserProfile from "../../../pages/UserProfile/UserProfile";

const Member = ({ name, imgUrl, role = "member" }) => {
  const [makeRole, setMakeRole] = useState(role);
  const [showVisible, setShowVisible] = useState(false);

  const makeAdminHandler = () => {
    setMakeRole("admin");
    setShowVisible(true);
  };

  const makeModeratorHandler = () => {
    setMakeRole("moderator");
  };

  const makeMemberHandler = () => {
    setMakeRole("member");
  };

  const UserProfileHandler = () => {
    console.log(`${name}'s Profile`);
  };

  return (
    <>
      <div className="member-list-container">
        <div className="main--team">
          <div className="has-top-border"></div>
          <div className="member-container">
            <ul className="member-list member">
              <li>
                <div className="member-avatar">
                  <img className="circle" src={imgUrl} alt="" />
                </div>
                <div className="member-meta">
                  <span className="name cursor" onClick={UserProfileHandler}>
                    {name}
                  </span>
                  <span className="role">{makeRole}</span>
                </div>
                <Options>
                  <div className="option-sec">
                    <button
                      className="make-role-btn"
                      onClick={makeAdminHandler}
                    >
                      Make admin
                    </button>

                    <button
                      className="make-role-btn"
                      onClick={makeModeratorHandler}
                    >
                      Make moderator
                    </button>

                    <button
                      className="make-role-btn"
                      onClick={makeMemberHandler}
                    >
                      Make member
                    </button>

                    <button
                      className="make-role-btn"
                      onClick={makeMemberHandler}
                    >
                      remove
                    </button>
                  </div>
                </Options>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Confirmation
        visible={showVisible}
        setVisible={setShowVisible}
        message={`Make ${name} admin and demote yourself?`}
        option="Confirm"
        onConfirm={() => console.log("Request Sent Successfully")}
      />
    </>
  );
};

export default Member;
