import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoPath from "../../images/wtwr.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../Contexts/CurrentUserContext"
const Header = ({
  weatherData,
  isLoggedIn,
  openAddModal,
  openLoginModal,
  openRegisterModal,
  
}) => {
  const currentUser = useContext(CurrentUserContext);
  
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  if (!weatherData) return null;

  return (
    <header className="header">
      <div className="header__container">
       <Link to={"/"}>
        <img src={logoPath} alt="wtrt logo" className="header__logo" />
        </Link>
        <h2 className="header__date">
          {currentDate}, {weatherData.city}
        </h2>
        <ToggleSwitch />
        {isLoggedIn ? (
          <button className="header__btn" type="button" onClick={openAddModal}>
            + Add clothes
          </button>
        ) : (
          <button className="header__btn" onClick={openRegisterModal}>
            Sign up
          </button>
        )}

     

        {isLoggedIn ? (
          <Link
            to={"/profile"}
            className="header__profile-link"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2 className="header__user-name">{currentUser.name}</h2>
            {currentUser.avatar === "" ? (
              <div className="header__user-icon_placeholder">
                {currentUser.name[0]}
              </div>
            ) : (
              <img
                className="header__user-icon"
                src={currentUser.avatar}
                alt="User avatar"
              />
            )}
          </Link>
        ) : (
          <button className="header__btn" onClick={openLoginModal}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
