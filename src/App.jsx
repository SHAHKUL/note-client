import { Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./component/login/Login";
import Signup from "./component/Signup";
import Maincomponent from "./Maincomponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main/*" element={<Maincomponent />} />
    </Routes>
  );
}

export default App;
