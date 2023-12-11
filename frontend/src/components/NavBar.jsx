import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function NavBar({ isLogin, isHome = false, buy }) {
  const [isLogout, setisLogout] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const logout = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get("/user/logout");
      if (res.data.success) {
        setUser({});
        setisLogout(true);
        navigate("/");
      } else {
        setisLogout(false);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">
            {" "}
            <Link className="none" to="/">
              RideMighty
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link active" aria-current="page">
                  {isHome ? (
                    buy ? (
                      <Link className="none" to="/sell">
                        Sell
                      </Link>
                    ) : (
                      <Link className="none" to="/">
                        Buy
                      </Link>
                    )
                  ) : isLogin ? (
                    <Link className="none" to="/register">
                      Register
                    </Link>
                  ) : (
                    <Link className="none" to="/">
                      Login
                    </Link>
                  )}
                </div>
              </li>
              {isHome && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      aria-current="page"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {!isLogout && <h6 className="red">Logout Failed</h6>}
      </nav>
    </>
  );
}
