import { useState } from "react";
import "./ProfileNavbar.css";
import About from "../AboutSection/About";
import Post from "../../Post/Post";
import CreatePost from "../../Post/CreatePost/CreatePost";

const ProfileNavbar = ({ type, data, about }) => {
  const [isUser, setUser] = useState(type === "user" ? true : false);
  const [isTeam, setTeam] = useState(type === "team" ? true : false);
  const [isAbout, setAbout] = useState(false);

  const handlePost = () => {
    setUser(true);
    setAbout(false);
  };

  const handleNotice = () => {
    setTeam(true);
    setAbout(false);
  };

  const handleAbout = () => {
    setAbout(true);
    setUser(false);
    setTeam(false);
  };

  return (
    <>
      <div className="profile-navbar-head">
        <div className="profile-navbar">
          <ul className="profile-nav">
            {type === "user" && (
              <>
                <li
                  className={isUser ? "profile-navbar__active" : ""}
                  onClick={handlePost}
                >
                  Post
                </li>
              </>
            )}

            {type === "team" && (
              <>
                <li
                  className={isTeam ? "profile-navbar__active" : ""}
                  onClick={handleNotice}
                >
                  Notice
                </li>
              </>
            )}
            <li
              className={isAbout ? "profile-navbar__active" : ""}
              onClick={handleAbout}
            >
              About
            </li>
          </ul>
        </div>
      </div>
      {type === "user" && (
        <>
          <div className={isUser ? "post-section" : "hidden"}>
            <CreatePost />
            {data.length > 0 &&
              data.map((post, index) => <Post key={index} data={post} />)}
          </div>
        </>
      )}
      {type === "team" && (
        <>
          <div className={isTeam ? "notice-section" : "hidden"}>
            <CreatePost />
            {data.length > 0 &&
              data.map((post, index) => <Post key={index} data={post} />)}
          </div>
        </>
      )}
      <div className={isAbout ? "about-section" : "hidden"}>
        <About data={about} />
      </div>
    </>
  );
};

export default ProfileNavbar;
