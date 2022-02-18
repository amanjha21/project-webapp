import { useState } from "react";
import "./profileNavbar.css";
import About from "../aboutSection/about";

const ProfileNavbar = () => {
  const [isPost, setPost] = useState(true);
  const [isAbout, setAbout] = useState(false);
  const [isShow, setShow] = useState(false);

  const handlePost = () => {
    setPost(true);
    setAbout(false);
    setShow(false);
  };

  const handleAbout = () => {
    setAbout(true);
    setPost(false);
    setShow(true);
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
        <div className={isShow ? "" : "hidden"}>
          <About />
        </div>
      </div>
    </>
  );
};

export default ProfileNavbar;
