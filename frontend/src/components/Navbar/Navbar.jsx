import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { ImCog } from "react-icons/im";
import { defaultTeamNotFoundImgUrl } from "../../helpers/Constants";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import UserSettings from "./UserSettings";
import Popup from "../Popup";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [showUserSettings, setShowUserSettings] = useState(false);

  useEffect(() => {
    const menuBtn = document.querySelector(".menu-icon span");
    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    const form = document.querySelector("form");
    menuBtn.addEventListener("click", () => {
      items.classList.add("active");
      menuBtn.classList.add("hide");
      searchBtn.classList.add("hide");
      cancelBtn.classList.add("show");
    });
    cancelBtn.addEventListener("click", () => {
      items.classList.remove("active");
      menuBtn.classList.remove("hide");
      searchBtn.classList.remove("hide");
      cancelBtn.classList.remove("show");
      form.classList.remove("active");
      cancelBtn.style.color = "#ff3d00";
    });
    searchBtn.addEventListener("click", () => {
      form.classList.add("active");
      searchBtn.classList.add("hide");
      cancelBtn.classList.add("show");
    });
    // Close the dropdown menu if the user clicks outside of it
    window.addEventListener("click", (event) => {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show-dropdown-contents")) {
            openDropdown.classList.remove("show-dropdown-contents");
          }
        }
      }
    });
  }, []);

  const navUser = useSelector((state) => state.currentUser.data);

  const navigate = useNavigate();

  const navProfileHandler = (e) => {
    e.preventDefault();
    navigate("/user");
  };
  const searchHandler = (e) => {
    e.preventDefault();
    console.log("searchHandler");
  };

  const navLoginBtnHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const navSiteLogoHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="navbar-main">
      <nav>
        <div className="menu-icon">
          <span>
            <GiHamburgerMenu />
          </span>
        </div>
        <div className="logo" onClick={navSiteLogoHandler}>
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
              <div className="nav-profile" onClick={navProfileHandler}>
                <img
                  src={navUser.imageUrl || defaultTeamNotFoundImgUrl}
                  alt=""
                />
                <span className="nav-userName">{navUser.name}</span>
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
                onClick={navLoginBtnHandler}
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
