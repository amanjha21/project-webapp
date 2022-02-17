import { useEffect } from "react";
import "./Navbar.css";
const Navbar = () => {
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
          <span className="fas fa-bars"></span>
        </div>
        <div className="logo">Sayem Tutorial</div>
        <form action="#">
          <input
            type="search"
            className="search-data"
            placeholder="Search"
            required
          ></input>
          <button type="submit" className="fas fa-search"></button>
        </form>
        <div className="nav-items">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <div className="dropdown">
              <button onClick={showDropdownHandler} className="dropbtn">
                Dropdown
              </button>
              <div id="myDropdown" className="dropdown-content">
                <a href="/">Log in as abdallah</a>
                <a href="/">update profile</a>
                <a href="/">Log out</a>
              </div>
            </div>
          </li>
        </div>
        <div className="search-icon">
          <span className="fas fa-search"></span>
        </div>
        <div className="cancel-icon">
          <span className="fas fa-times"></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
