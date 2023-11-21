import React from "react";
import { Link } from "react-router-dom";

import { formatDistanceToNow } from "date-fns";
const Card = (prop) => {
  const { cur, handleDelete, handleStore, setComple, setShowimportant } = prop;
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
        <span className="button-59">
          <p>Mark as Important</p>
          <input
            id="check-box"
            type="checkbox"
            checked={cur.mark}
            onChange={(e) => setShowimportant(e.target.checked)}
          />
        </span>
      </span>
      <div>
        <span style={{ display: "flex" }}>
          {cur.complete ? (
            <h1>
              <s>{cur.title}</s>
            </h1>
          ) : (
            <h1>{cur.title}</h1>
          )}
          {cur.important && <i id="star" className="fa-solid fa-star"></i>}
        </span>

        <p style={{ fontSize: "20px" }}>{cur.desc.slice(0, 60)}</p>
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
            Created {formatDistanceToNow(new Date(cur.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
