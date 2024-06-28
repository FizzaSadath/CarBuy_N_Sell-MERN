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
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{padding:"0px"}} >
        <div className="container-fluid" style={{backgroundColor:"#092635"}}>
          <div className="navbar-brand" >
            <Link className="none" to="/">
              <h1 style={{color:"#9EC8B9", fontStyle:"italic"}}>Neo   </h1>
              <h6 style={{color:"#FFFFFF"}}>pre-owned vehicle merchandise</h6>
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
                      <Link className="none" to="/sell" style={{color:"#FFFFFF"}}>
                        Sell
                      </Link>
                    ) : (
                      <Link className="none" to="/" style={{color:"#FFFFFF"}}>
                        Buy
                      </Link>
                    )
                  ) : isLogin ? (
                    <Link className="none" to="/register" style={{color:"#FFFFFF"}}>
                      Register
                    </Link>
                  ) : (
                    <Link className="none" to="/" style={{color:"#FFFFFF"}}>
                      Login
                    </Link>
                  )}
                </div>
              </li>
              {isHome && (
                <>
                  <li className="nav-item">
                    <Link className="none nav-link active" to="/myAds" style={{color:"#FFFFFF"}}>
                      My Ads
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      aria-current="page"
                      onClick={logout}
                      style={{color:"#FFFFFF"}}
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
