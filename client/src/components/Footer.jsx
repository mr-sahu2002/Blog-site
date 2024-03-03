import React from "react";
import "../style/style.scss";
import Logo from "../assets/logo.png";

function Footer() {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>Made By Kushal.</span>
    </footer>
  );
}

export default Footer;
