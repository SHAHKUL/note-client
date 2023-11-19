import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../URL";

function Edit() {
  const [listOpen, setListOpen] = useState(false);
  const [col, setcol] = useState("");
  const addNote = (it) => {
    console.log(it);
    setcol(it);
  };

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    let Singledata = await axios.get(
      `${URL}/note/get/${params.id}`,
      {
        headers: {
          auth: window.localStorage.getItem("guvi"),
        },
      }
    );
    formik.setValues(Singledata.data);
    setcol(Singledata.data.color);
    console.log(Singledata.data);
  };

  let formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      color: "",
    },

    onSubmit: async (values) => {
      try {
        await axios.put(
          `${URL}/note/update/${params.id}`,
          { ...values, color: col },
          {
            headers: {
              auth: window.localStorage.getItem("guvi"),
            },
          }
        );
        navigate("/main/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Edit</h1>
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
            +
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
              <span className="text">Update</span>
              <span>Save</span>
            </button>
         
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
