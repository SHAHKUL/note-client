import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./view.css";
import URL from "../../URL";

function View() {
  let params = useParams();

  const [user, setUser] = useState({});
  const [listOpen, setListOpen] = useState(false);
  const [col, setcol] = useState("");
  const [font, setFont] = useState(30);


  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    let Singledata = await axios.get(
      `${URL}/note/get/${params.id}`,  {
        headers: {
          auth: window.localStorage.getItem("guvi"),
        },
      }
    );
    setUser(Singledata.data);
  
  };

  const addNote = (it) => {
    console.log(it);
    setcol(it);
  };

  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
  return (
    <>
      <div className="font-size">
        <span style={{ display: "flex", alignItems: "center" }}>
          <button
            className="view-plus"
            onClick={() => setFont(font + 1)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            +
          </button>
          <p className="font-view">Font Size</p>
          <button
            className="view-plus"
            onClick={() => setFont(font - 1)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            -
          </button>
        </span>
      </div>
      <div
        className="create-box"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div className="view-sidebar">
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

        <div>
          <h1 className="view-tit"  style={{
              background: col ? col : user.title,
             
            }}> {user.title}</h1>

          <div
            style={{
              background: col ? col : user.title,
              fontSize: `${font}px`,
            }}
            className="view-input"
          >
            {user.desc}
          </div>
          <Link to={"/main/"}>
        <button className="button-33">Back</button>
      </Link>
        </div>
      </div>
     
    </>
  );
}

export default View;
