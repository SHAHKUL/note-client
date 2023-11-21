import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import axios from "axios";
import URL from "../URL";

function Signup() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post(`${URL}/auth/register`, values);

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="body-login">
      <div className="container-login">
        <div className="brand-logo-login">
          <img
            className="image"
            src="https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png"
          ></img>
        </div>
        <div class="brand-title-login">Task Manager</div>
        <h4 style={{ color: "#B32624", marginBottom: "40px" }}>Signup</h4>
        <form className="form-login" onSubmit={formik.handleSubmit}>
          <div className="inputs-login">
            <label className="label-login">NAME</label>
            <input
              className="input-login"
              placeholder="example@test.com"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
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
              placeholder="Min 6 charaters long"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <button className="button-login" type="submit">
              Submit
            </button>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <button className="button-login" type="submit">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
