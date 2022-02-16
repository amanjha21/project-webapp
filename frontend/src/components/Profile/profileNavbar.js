import { useState } from "react";
import "./profileNavbar.css";

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
          <li className={isPost ? "active" : "null"} onClick={handlePost}>
            Post
          </li>
          <li className={isAbout ? "active" : "null"} onClick={handleAbout}>
            About
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileNavbar;
