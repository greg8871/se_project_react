import React from "react";
import "./../Header/header.css";
import logoPath from "../../images/wtwr.svg";
/* import avatarDefault from "../../images/Avatar.svg"; */

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ weatherData, handleAddClick }) => {
  if (!weatherData) return null;

  const username = "Greg Cunningham";
  const avatar = "";

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoPath} alt="wtrt logo" className="header__logo" />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__nav">
        <nav className="navigation">
          <ul className="navigation__container">
            <li>
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-button"
              >
                {" "}
                + Add clothes
              </button>
            </li>
            <li>
              <div className="navigation__link">
                {username}
                {avatar ? (
                  <img
                    className="navigation__user"
                    src={avatar}
                    alt="User avatar"
                  />
                ) : (
                  <span className="navigation__user navagation__user_type_name">
                    {username?.toUpperCase().charAt(0) || ""}
                  </span>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
