import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ dark, setDark }) {
  let navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("guvi");
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png"
          className="logo-image"
        />
        <h3 className="navbar-name">Welcome!!!</h3>
      </div>

      <h1 className="navbar-title">Task Manager</h1>
      <div>
        {dark ? (
          <i
            className="fa-solid fa-sun fa-2x"
            style={{ color: "rgb(250,189,5)", cursor: "pointer" }}
            onClick={() => setDark(!dark)}
          ></i>
        ) : (
          <i
            onClick={() => setDark(!dark)}
            className="fa-solid fa-moon fa-2x"
            style={{ color: "rgb(0,1,32)", cursor: "pointer" }}
          ></i>
        )}
        <button className="nav-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
