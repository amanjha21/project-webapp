import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { ImCog } from "react-icons/im";

import "./Navbar.css";
import UserSettings from "./UserSettings";
import Popup from "../Popup";
const Navbar = () => {
  const [showUserSettings, setShowUserSettings] = useState(false);

  const navProfileHandler = (e) => {
    e.preventDefault();
  };
  const searchHandler = (e) => {
    e.preventDefault();
    console.log("searchHandler");
  };
  return (
    <div className="navbar-main">
      <nav>
        <div className="menu-icon">
          <span>
            <GiHamburgerMenu />
          </span>
        </div>
        <div className="logo">
          <span>S</span>yno<span>A</span>rx
        </div>
        <form onSubmit={searchHandler}>
          <input
            type="search"
            className="search-data"
            placeholder="Search"
            required
          ></input>
          <button type="submit">
            <MdOutlineSearch />
          </button>
        </form>
        <div className="nav-items">
          <li>
            <div>
              <div className="nav-profile" onClick={() => navProfileHandler}>
                <img
                  src="http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg"
                  alt=""
                />
                <span className="nav-userName">UserName</span>
              </div>
            </div>
          </li>

          <li>
            <div onClick={() => setShowUserSettings(true)}>
              <div className="nav-dropdown">
                <ImCog />
              </div>
            </div>
          </li>
          <li>
            <div>
              <div
                className="nav-login-btn rounded-corner"
                onClick={() => navProfileHandler}
              >
                <span className="nav-login-text">Login</span>
              </div>
            </div>
          </li>
        </div>
        <div className="search-icon">
          <span>
            <MdOutlineSearch />
          </span>
        </div>
        <div className="cancel-icon">
          <span>
            <AiOutlineClose />
          </span>
        </div>
      </nav>
      <Popup visible={showUserSettings} setVisible={setShowUserSettings}>
        <UserSettings />
      </Popup>
    </div>
  );
};

export default Navbar;
