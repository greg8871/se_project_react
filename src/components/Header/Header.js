import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoPath from "../../images/wtwr.svg";
import avatarDefault from "../../images/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ weatherData, openModal, handleAddClick }) => {
  if (!weatherData) return null;

  const username = "Greg Cunningham";
  /* const avatar = ""; */

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoPath} alt="wtrt logo" className="header__logo" />
        <h2 className="header__date">
          {currentDate}, {weatherData.city}
        </h2>
        <ToggleSwitch />
        <button
          onClick={openModal}
          type="button"
          className="header__add-button"
        >
          + Add clothes
        </button>
        <Link
          to={"/profile"}
          className="header__profile-link"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2 className="header__user-name">{username}</h2>
          <img
            className="header__user-icon"
            src={avatarDefault}
            alt="User avatar"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
