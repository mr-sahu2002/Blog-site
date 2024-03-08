import React from "react";
import "../style/style.scss";
import Logo from "../assets/logo.png";

function Footer() {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span style={{ fontSize: "20px" }}>Made By Sahu & Nithin 😎</span>
    </footer>
  );
}

export default Footer;
