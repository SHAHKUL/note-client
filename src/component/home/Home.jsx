import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import URL from "../../URL";

function Home({ dark }) {
  const [list, setList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [comple, setComple] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    var res = await axios.get(`${URL}/note/get/`, {
      headers: {
        auth: window.localStorage.getItem("guvi"),
      },
    });
    setList(res.data);
  };

  const handleDelete = async (ide) => {
    await axios.delete(`${URL}/note/remove/${ide}`, {
      headers: {
        auth: window.localStorage.getItem("guvi"),
      },
    });
    fetch();
  };

  const handleCheck = async (ide) => {
    const get = await axios.get(`${URL}/note/get/${ide}`, {
      headers: {
        auth: window.localStorage.getItem("guvi"),
      },
    });
    console.log(get.data);
    await axios.put(
      `${URL}/note/update/${ide}`,
      {
        ...get.data,
        complete: comple,
      },
      {
        headers: {
          auth: window.localStorage.getItem("guvi"),
        },
      }
    );
    fetch();
    console.log(checked);
  };

  return (
    <>
      <div
        className="home-box"
        style={{ background: dark ? "rgb(32,33,36)" : "" }}
      >
        <div className="main-box">
          <span className="filter-box">
            <div className="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>

              <ul className="dropdown-menu">
                <li style={{ padding: "5px" }}>
                  <input
                    type="checkbox"
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <label style={{ paddingLeft: "5px" }}> Completed</label>
                </li>
                <li style={{ padding: "5px" }}>
                  <input type="checkbox" />
                  <label style={{ paddingLeft: "5px" }}> Incompleted</label>
                </li>

                <li style={{ padding: "5px" }}>
                  <input type="checkbox" />
                  <label style={{ paddingLeft: "5px" }}> All</label>
                </li>
              </ul>
            </div>
          </span>
          <input
            className="inputs"
            placeholder="Search the note name"
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        {list
          .filter((item) => {
            if (item.complete == checked) {
              console.log(item);
              return item;
            }
            if (filterText.toLowerCase() === "") {
              console.log(item);
              return item;
            } else {
              console.log(item);
              return item.title.toLowerCase().includes(filterText);
            }
          })
          .map((cur) => {
            return (
              <div
                className="box"
                style={{
                  background: cur.color,
                  opacity: cur.complete ? 0.5 : 1,
                }}
                key={cur._id}
              >
                <input
                  type="checkbox"
                  onChange={(e) => setComple(e.target.checked)}
                />
                <div>
                  {cur.complete ? (
                    <h1>
                      <s>{cur.title}</s>
                    </h1>
                  ) : (
                    <h1>{cur.title}</h1>
                  )}

                  <p style={{ fontSize: "20px" }}>{cur.desc.slice(0, 60)}</p>
                  <span style={{ display: "flex",color:"blue" }}>
                    <Link to={`/main/view/${cur._id}`}>
                      <i className="fa-solid fa-eye icon"></i>
                    </Link>

                    <Link to={`/main/edit/${cur._id}`}>
                      <i
                        style={{ marginLeft: "20px",color:"blue" }}
                        className="fa-solid fa-pen-to-square icon"
                      ></i>
                    </Link>

                    <i
                      style={{ marginLeft: "20px",color:"blue",cursor:"pointer" }}
                      className="fa-solid fa-trash-can icon"
                      onClick={() => handleDelete(cur._id)}
                    ></i>
                  </span>
                  <div style={{ display: "flex",marginTop:"20px" }}>
                    <button
                      className="button-82-pushable"
                      role="button"
                      onClick={() => handleCheck(cur._id)}
                    >
                      <span className="button-82-shadow"></span>
                      <span className="button-82-edge"></span>
                      <span className="button-82-front text">Store</span>
                    </button>

                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "20px",
                        fontWeight: "500",
                        marginLeft: "30px",
                      }}
                    >
                      {cur.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        <Link to={"/main/create"}>
          <button className="plus">+</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
