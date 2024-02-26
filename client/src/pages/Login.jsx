import React from "react";
import { useState, useEffect } from "react";
import client from "./axios-config";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    client
      .get("/api/user")
      .then(function (res) {
        console.log(res.data.user.id);
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function submitLogin(e) {
    e.preventDefault();
    client
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        navigate("/");
        setCurrentUser(true);
      })
      .catch(function (error) {
        setError("*password is not matching for the email");
      });
  }

  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={(e) => submitLogin(e)}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bxs-user"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bxs-lock-alt sec"></i>
          {error && <p style={{ color: "#000000" }}>{error}</p>}
          <button type="submit">Login</button>
          <div className="linkto">
            <label>Don't have an account? </label>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
