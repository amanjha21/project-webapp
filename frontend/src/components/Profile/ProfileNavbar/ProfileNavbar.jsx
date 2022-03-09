import { useState } from "react";
import "./ProfileNavbar.css";
import About from "../AboutSection/About";
import Post from "../../Post/Post";
import CreatePost from "../../Post/CreatePost/CreatePost";

const ProfileNavbar = ({ type }) => {
  const [isPost, setPost] = useState(type === "user" ? true : false);
  const [isNotice, setNotice] = useState(type === "team" ? true : false);
  const [isAbout, setAbout] = useState(false);

  const handlePost = () => {
    setPost(true);
    setAbout(false);
  };

  const handleNotice = () => {
    setNotice(true);
    setAbout(false);
  };

  const handleAbout = () => {
    setAbout(true);
    setPost(false);
    setNotice(false);
  };

  return (
    <>
      <div className="profile-navbar-head">
        <div className="profile-navbar">
          <ul className="profile-nav">
            {type === "user" && (
              <>
                <li
                  className={isPost ? "profile-navbar__active" : ""}
                  onClick={handlePost}
                >
                  Post
                </li>
              </>
            )}

            {type === "team" && (
              <>
                <li
                  className={isNotice ? "profile-navbar__active" : ""}
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
          <div className={isPost ? "post-section" : "hidden"}>
            <CreatePost />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </>
      )}
      {type === "team" && (
        <>
          <div className={isNotice ? "notice-section" : "hidden"}>
            <CreatePost />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </>
      )}
      <div className={isAbout ? "about-section" : "hidden"}>
        <About />
      </div>
    </>
  );
};

export default ProfileNavbar;
