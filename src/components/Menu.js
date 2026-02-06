import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "../api";
import { toggleTheme } from "../theme";
import { LANDING_URL } from "../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("USER");

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } finally {
      window.location.href = `${LANDING_URL}/login`;
    }
  };

  useEffect(() => {
    api
      .get("/me")
      .then((res) => {
        const name = res?.data?.user?.username || "USER";
        setUsername(name);
      })
      .catch(() => {
        setUsername("USER");
      });
  }, []);

  const displayName =
    username && username.includes("@") ? username.split("@")[0] : username;
  const avatarLetter =
    displayName && displayName.length > 0
      ? displayName[0].toUpperCase()
      : "U";

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/allOrders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
          {/* <li>
            <a
              style={{ textDecoration: "none" }}
              href="http://localhost:3000/"
              onClick={() => handleMenuClick(7)}
            >
              <p className={selectedMenu === 7 ? activeMenuClass : menuClass}>
                Landing
              </p>
            </a>
          </li> */}
        </ul>
        <hr />
        <div className="profile-wrap">
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{avatarLetter}</div>
            <p className="username">{displayName}</p>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-menu">
              <button className="profile-action" onClick={toggleTheme}>
                Toggle theme
              </button>
              <button
                className="profile-action"
                onClick={() => (window.location.href = `${LANDING_URL}/`)}
              >
                Back to landing
              </button>
              <button className="profile-action" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
// http://localhost:3002/allOrders
