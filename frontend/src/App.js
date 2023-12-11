import { useContext, useEffect, useState } from "react";
import axios from "axios";

import Buy from "./screens/Buy";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Sell from "./screens/Sell";

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const getUser = async () => {
        const res = await axios.get("/user/getUser");
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          if (res.data.error === "login" || res.data.error === "exist") {
          } else {
            alert(res.data.error);
          }
        }
        setIsLoading(false);
      };
      getUser();
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  }, [setUser]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isLoading ? <div>loading...</div> : user._id ? <Buy /> : <Login />
            }
          />
          <Route
            exact
            path="/register"
            element={
              isLoading ? (
                <>loading...</>
              ) : user._id ? (
                <Navigate to="/" replace />
              ) : (
                <Register />
              )
            }
          />
          <Route
            exact
            path="/sell"
            element={
              isLoading ? (
                <>loading...</>
              ) : user._id ? (
                <Sell />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
