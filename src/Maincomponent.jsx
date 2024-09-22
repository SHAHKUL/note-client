import  { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import View from "./component/view/View";
import Edit from "./component/Edit";
import Home from "./component/home/Home";
import Create from "./component/create/Create";

function Maincomponent() {
  const [dark, setDark] = useState(false);
  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <Routes>
        <Route path="/" element={<Home dark={dark} />} />
        <Route path="/create/" element={<Create dark={dark} />} />
        <Route path="/view/:id" element={<View dark={dark} />} />
        <Route path="/edit/:id" element={<Edit dark={dark} />} />
      </Routes>
    </>
  );
}

export default Maincomponent;
