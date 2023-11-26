import React, { useState } from "react";
import NavBar from "../components/NavBar";

export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password do not match");
    } else {
      return <>
      <h1>helo</h1>
      </>
    }
  };
  return (
    <>
      <NavBar isLogin={false}/>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => {
                return setname(e.target.value);
              }}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="Cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Cpassword"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
