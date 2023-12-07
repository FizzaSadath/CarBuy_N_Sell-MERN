import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ isLogin, isHome = false, buy }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">
            RideMighty
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
                      <Link className="none" to="/buy">
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
                    <div className="nav-link active" aria-current="page">
                      Logout
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
