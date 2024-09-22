import { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";

import URL from "../../URL";
import Card from "./Card";
import Loader from "./Loader";

function Home(prop) {
  const { dark } = prop;
  const [list, setList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [load, setLoad] = useState(false);

  const [comple, setComple] = useState(false);
  const [showimortant, setShowimportant] = useState(false);

  const [checked, setChecked] = useState(false);
  const [inchecked, setInchecked] = useState(false);
  const [immediate, setImmediate] = useState(false);

  const [currentPage, setCurrentpage] = useState(1);
  const recordPerpage = 4;
  const lastIndex = currentPage * recordPerpage;
  const firstIndex = lastIndex - recordPerpage;
  const records = list.slice(firstIndex, lastIndex);
  const npage = Math.ceil(list.length / recordPerpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoad(true)
    var res = await axios.get(`${URL}/note/get/`, {
      headers: {
        auth: window.localStorage.getItem("guvi"),
      },
    });
    setLoad(false )
    setList(res.data);
  };

  const handleDelete = async (ide) => {
    setLoad(true)
    await axios.delete(`${URL}/note/remove/${ide}`, {
      headers: {
        auth: window.localStorage.getItem("guvi"),
      },
    });
    fetch();
    setLoad(false )
  };

  const handleStore = async (ide) => {
    const get = await axios.get(`${URL}/note/get/${ide}`, {
      headers: {
        auth: window.localStorage.getItem("guvi"),
      },
    });
setLoad(true)
 await axios.put(
      `${URL}/note/update/${ide}`,
      {
        ...get.data,
        important: !get.data.important,
        complete: comple,
      },
      {
        headers: {
          auth: window.localStorage.getItem("guvi"),
        },
      }
    );
    fetch();
    
  setLoad(false)
    
    
  };


  // const handleImportantButton=()=>{

  // }

  const handleCheck = (e) => {
    setChecked(e.target.checked);
    setInchecked(false);
  };

  const handleInchecked = (e) => {
    setInchecked(e.target.checked);
    setChecked(false);
  };

  const handleImportant = (e) => {
    setImmediate(e.target.checked);
  };

  const handleRemovefilter = () => {
    setChecked("");
    setInchecked("");
    setImmediate("");
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentpage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  };

  const changePage = (ide) => {
    setCurrentpage(ide);
  };

  const removeWord = () => {
    setFilterText("");
  };

  return (
    <>
      <div className="home-box" style={{ background: dark ? "#202124" : "" }}>
        <div className="main-box">
          <span className="filter-box">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>

              <ul className="dropdown-menu">
                <li style={{ padding: "5px" }}>
                  <input
                    id="check-box"
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheck}
                  />
                  <label style={{ paddingLeft: "5px" }}>Incompleted </label>
                </li>
                <li style={{ padding: "5px" }}>
                  <input
                    id="check-box"
                    type="checkbox"
                    checked={inchecked}
                    onChange={handleInchecked}
                  />
                  <label style={{ paddingLeft: "5px" }}>Completed </label>
                </li>

                <li style={{ padding: "5px" }}>
                  <input
                    id="check-box"
                    type="checkbox"
                    checked={immediate}
                    onChange={handleImportant}
                  />
                  <label style={{ paddingLeft: "5px" }}> Important</label>
                </li>
                <li style={{ padding: "5px" }}>
                  <input
                    id="check-box"
                    type="checkbox"
                    onChange={handleRemovefilter}
                  />
                  <label style={{ paddingLeft: "5px" }}> Clear Filter</label>
                </li>
              </ul>
            </div>
          </span>

          <input
            style={{ background: "#ffff",color:'black' }}
            value={filterText}
            className="inputs"
            placeholder="Search the note name"
            onChange={(e) => setFilterText(e.target.value)}
          />
          {filterText && (
            <i className="fa-solid fa-x remove-but" onClick={removeWord}></i>
          )}
        </div>
        {records.map((cur) => {
          if (
            cur.title.toLowerCase().indexOf(filterText.trim().toLowerCase()) ===
            -1
          ) {
            return;
          }
          if (checked && cur.complete) {
            return;
          }
          if (inchecked && !cur.complete) {
            return;
          }
          if (immediate && !cur.important) {
            return;
          }

          return (
            <Card
              cur={cur}
              key={cur._id}
              handleDelete={handleDelete}
              handleStore={handleStore}
              comple={comple}
              showimortant={showimortant}
              setComple={setComple}
              setShowimportant={setShowimportant}
            />
          );
        })}

        <Link to={"/main/create"}>
          <button className="plus">+</button>
        </Link>
        <nav aria-label="Page navigation example" style={{marginTop:"170px"}}>
          <ul className="pagination justify-content-center" id="pag">
            <li className="page-item ">
              <a className="page-link" onClick={prevPage}>
                Previous
              </a>
            </li>

            {numbers.map((n, idx) => {
              return (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={idx}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => changePage(n)}
                  >
                    {n}
                  </a>
                </li>
              );
            })}

            <li className="page-item">
              <a className="page-link" href="#" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
        {load && <Loader />}
      </div>
    </>
  );
}

export default Home;
