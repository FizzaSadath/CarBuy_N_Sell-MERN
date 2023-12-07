import { useContext,useEffect } from "react";

import Buy from "./screens/Buy";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Sell from "./screens/Sell";



import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/buy" element={<Buy />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/sell" element={<Sell />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
