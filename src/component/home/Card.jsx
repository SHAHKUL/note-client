import React, { useState } from "react";
import { Link } from "react-router-dom";

import { format } from "date-fns";
const Card = (prop) => {
  const { cur, handleDelete, handleStore, setComple, setShowimportant } = prop;
  const [alarm, setAlarm] = useState(false);

  // const handleAlarm = () => {
  //   setAlarm(!alarm);
  // };
  return (
    <div
      className="box"
      style={{
        background: cur.color,
        opacity: cur.complete ? 0.5 : 1,
      }}
      key={cur._id}
    >
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          id="check-box"
          type="checkbox"
          checked={cur.checked}
          onChange={(e) => setComple(e.target.checked)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"flex-end",marginTop:"10px"}}>
          <i
            className={`fa-${alarm ? "solid" : "regular"} fa-clock alarm`}
            onClick={handleAlarm}
            style={{ marginRight: "20px" }}
          ></i>
         {alarm&& <p style={{marginRight:"10px",marginTop:"10px"}}>Set Alarm on 4:18 PM, 21st November, 2023</p>}
          </div> */}
          <span className="button-59">
            <p>Mark as Important</p>
            <input
              id="check-box"
              type="checkbox"
              checked={cur.mark}
              onChange={(e) => setShowimportant(e.target.checked)}
            />
          </span>
        </div>
      </span>
      <div>
        <span style={{ display: "flex" }}>
          {cur.complete ? (
            <h1>
              <s>{cur.title.toUpperCase()}</s>
            </h1>
          ) : (
            <h1>{cur.title.toUpperCase()}</h1>
          )}
          {cur.important && <i id="star" className="fa-solid fa-star"></i>}
        </span>

        <p style={{ fontSize: "20px" }} className="para">
          {cur.desc.slice(0, 90)}
        </p>
        <span style={{ display: "flex", color: "blue" }}>
          <Link to={`/main/view/${cur._id}`}>
            <i className="fa-solid fa-eye icon"></i>
          </Link>

          <Link to={`/main/edit/${cur._id}`}>
            <i
              style={{ marginLeft: "20px", color: "blue" }}
              className="fa-solid fa-pen-to-square icon"
            ></i>
          </Link>

          <i
            style={{
              marginLeft: "20px",
              color: "blue",
              cursor: "pointer",
            }}
            className="fa-solid fa-trash-can icon"
            onClick={() => handleDelete(cur._id)}
          ></i>
        </span>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <button
            className="button-82-pushable"
            role="button"
            onClick={() => handleStore(cur._id)}
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">Save</span>
          </button>

          <p className="create-by">
            Created on{" "}
            {format(new Date(cur.createdAt), "h:mm a, do MMMM, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
