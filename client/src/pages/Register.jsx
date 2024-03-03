import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../axios-config";
import "../style/Register.scss";

function Register() {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .get("/api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function submitRegistration(e) {
    e.preventDefault();
    client
      .post("/api/register", {
        email: email,
        username: username,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setError("*The password is too short or email ID exists!");
        // setError(error.response.data);
      });
  }

  return (
    <div>
      {currentUser ? (
        <div className="auth">
          <h1>user succesfully created!!</h1>
          <br />
          <center>
            <Link style={{ color: "white" }} to="/login">
              Login
            </Link>
          </center>
        </div>
      ) : (
        <div className="auth">
          <div className="regis-auth-container">
            <form onSubmit={(e) => submitRegistration(e)}>
              <h1>Register</h1>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user regi-icon1"></i>
              <input
                type="text"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-user regi-icon2"></i>
              <input
                type="password"
                placeholder="Password (At leat 8 char)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt regi-icon3"></i>
              {error && <p style={{ color: "#000000" }}>{error}</p>}
              <button type="submit">Create User</button>
              <div className="linkto">
                <label>Already have an account? </label>
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
