import React, { useState } from "react";
import NavBar from "../components/NavBar";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <NavBar isLogin={true}/>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
