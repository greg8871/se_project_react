import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__text">Developed by </h3>
        <h3 className="footer__text">{new Date().getFullYear()}</h3>
      </div>
    </footer>
  );
};

export default Footer;
