import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

import URL from "../../URL";
function Login() {
  const [err, setErr] = useState("");
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (val) => {
      try {
        var res = await axios.post(`${URL}/auth/login`, val);
        window.localStorage.setItem("guvi", res.data.token);

        if (res.data.token) {
          navigate("/main/");
        } else {
          console.log(res.data.message);
          setErr(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="body-login">
        <div className="container-login">
          <div className="brand-logo-login">
            <img
              className="image"
              src="https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png"
            ></img>
          </div>
          <div className="brand-title-login">Task Manager</div>
          <h4 style={{ color: "#B32624", marginBottom: "40px" }}>Login</h4>
          <form className="form-login" onSubmit={formik.handleSubmit}>
            <div className="inputs-login">
              <label className="label-login">EMAIL</label>
              <input
                className="input-login"
                placeholder="example@test.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <label>PASSWORD</label>
              <input
                className="input-login"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <p style={{ color: "red" }}>{`${err}`}</p>
              <button className="button-login" type="submit">
                Login
              </button>
              <Link style={{ textDecoration: "none" }} to={"/signup"}>
                <button className="button-login" type="submit">
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <span style={{ color: "red" }}>
        <h4>email:</h4>
        <h4>user@gmail.com</h4>
        <h4>Password:</h4>
        <h4>user</h4>
      </span>
    </>
  );
}

export default Login;
