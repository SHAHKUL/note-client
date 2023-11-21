import React, { useState } from "react";
import "./create.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import URL from "../../URL";

function Create() {
  const [listOpen, setListOpen] = useState(false);
  const [col, setcol] = useState("");
  const addNote = (it) => {
    setcol(it);
    console.log(it);
  };
  let nav = useNavigate();
  let formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      color: "",
    },
    onSubmit: async (val) => {
      await axios.post(
        `${URL}/note/create`,
        { ...val, color: col },
        {
          headers: {
            auth: window.localStorage.getItem("guvi"),
          },
        }
      );
      nav("/main/");
    },
  });

  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
  return (
    <>
      <div
        className="create-box"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div className="sidebar">
          <button
            className="plus-add"
            alt="Add"
            onClick={() => setListOpen(!listOpen)}
          >
            <span className="ytp-but">+</span>
          </button>

          <ul
            className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}
          >
            {colors.map((item, index) => (
              <li
                key={index}
                className="sidebar_list_item"
                style={{ backgroundColor: item }}
                onClick={() => addNote(item)}
              />
            ))}
          </ul>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <h1 className="create-tit">Title</h1>
            <input
              className="title-input"
              style={{ background: col ? col : "yellow" }}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <h1 className="create-tit">Description</h1>

            <textarea
              style={{ background: col ? col : "yellow" }}
              rows="4"
              cols="50"
              className="desc-input"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange}
            ></textarea>

            <button className="create-but" role="button" type="submit">
              <span className="text">Create</span>
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Create;
