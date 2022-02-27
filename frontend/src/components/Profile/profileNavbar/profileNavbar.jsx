import { useState } from "react";
import "./ProfileNavbar.css";
import About from "../AboutSection/About";
import Post from "../../Post/Post";
import CreatePost from "../../Post/CreatePost/CreatePost";

const ProfileNavbar = () => {
  const [isPost, setPost] = useState(true);
  const [isAbout, setAbout] = useState(false);

  const handlePost = () => {
    setPost(true);
    setAbout(false);
  };

  const handleAbout = () => {
    setAbout(true);
    setPost(false);
  };

  return (
    <>
      <div className="profile-navbar">
        <ul className="profile-nav">
          <li
            className={isPost ? "profile-navbar__active" : ""}
            onClick={handlePost}
          >
            Post
          </li>
          <li
            className={isAbout ? "profile-navbar__active" : ""}
            onClick={handleAbout}
          >
            About
          </li>
        </ul>
      </div>
      <div>
        <div className={isPost ? "" : "hidden"}>
          <CreatePost />
          <Post />
        </div>
        <div className={isAbout ? "" : "hidden"}>
          <About />
        </div>
      </div>
    </>
  );
};

export default ProfileNavbar;
