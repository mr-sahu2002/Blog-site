import React from "react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import client from "../axios-config";
import "../style/style.scss";

function Navbar() {
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    client
      .get("/api/user")
      .then(function (res) {
        setUsername(res.data.user.username);
        setCurrentUser("logout");
      })
      .catch(function (error) {
        setCurrentUser("log in");
      });
  }, []);

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout", { withCredentials: true }).then(function (res) {
      setCurrentUser("login");
      navigate("/login");
    });
  }
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="links">
          <Link className="link" to="/?cat=anime">
            <h6>ANIME</h6>
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

          <Link to="/profile" className="userId">
            <span>{username}</span>
          </Link>
          <span>
            <form onSubmit={(e) => submitLogout(e)}>
              <button type="submit" className="log" variant="light">
                {currentUser}
              </button>
            </form>
          </span>

          <span className="write">
            <Link className="linkWrite" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
