import React from "react"
import Logo from "../assets/logo.png";
import {Link} from "react-router-dom"
import '../style.scss'

function Navbar(){
    return (
        <div className="navbar">
          <div className="container">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </div>

            <div className="links">
              <Link className="link" to="/?cat=art">
                <h6>ART</h6>
              </Link>

              <Link className="link" to="/?cat=science">
                <h6>SCIENCE</h6>
              </Link>

              <Link className="link" to="/?cat=technology">
                <h6>TECHNOLOGY</h6>
              </Link>

              <Link className="link" to="/?cat=travel">
                <h6>TRAVEL</h6>
              </Link>

              <Link className="link" to="/?cat=event">
                <h6>EVENT</h6>
              </Link>

              <Link className="link" to="/?cat=food">
                <h6>FOOD</h6>
              </Link>

              <span>Kushal</span>
              <span >Logout</span>
              <span className="write">
                <Link className="link" to="/write">
                  Write
                </Link>
              </span>
            </div>
          </div>
        </div>
      );
};

export default Navbar