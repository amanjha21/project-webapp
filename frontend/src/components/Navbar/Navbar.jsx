import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./Navbar.css";
import UserSettings from "./UserSettings";
import Popup from "../Popup";
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
  function showDropdownHandler() {
    document
      .getElementById("myDropdown")
      .classList.toggle("show-dropdown-contents");
  }
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
        <form action="#">
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
            <a href="/">
              <div className="nav-profile">
                <img
                  src="http://cp91279.biography.com/1000509261001/1000509261001_1822909398001_BIO-Biography-29-Innovators-Mark-Zuckerberg-115956-SF.jpg"
                  alt=""
                />{" "}
              </div>
            </a>
          </li>
          <li>
            <div onClick={() => setShowUserSettings(true)}>
              <div className="nav-dropdown">
                <BiDotsVerticalRounded />
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
