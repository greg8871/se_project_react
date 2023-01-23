import React from "react";
import "./../Header/Header.css";
import logoPath from "../../images/wtwr.svg";
import avatarDefault from "../../images/Avatar.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ weatherData, handleAddClick }) => {
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

        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-button"
        >
          + Add clothes
        </button>
        <h2 className="header__user-name">{username}</h2>
        <img
          className="header__user-icon"
          src={avatarDefault}
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default Header;
