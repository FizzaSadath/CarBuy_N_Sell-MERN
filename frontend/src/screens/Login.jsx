import React, { useState, useContext } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [credError, setcredError] = useState(false);
  const [serverError, setserverError] = useState(false);

  // const { user, setUser } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setcredError(false);
      setserverError(false);
      const data = { email, password };
      const res = await axios.post("/user/login", data);
      if (res.data.success) {
        setcredError(false);
        setUser(res.data.user);
        navigate("/");
      } else {
        if (res.data.error === "cred") {
          setcredError(true);
        } else {
          setserverError(true);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div style={{backgroundColor:"#9EC8B9", height:"729px"}} >
      <NavBar isLogin={true} />
      
      <div className="container" style={{ marginTop:"20px"}}>
        <form onSubmit={onSubmit}>
          {serverError ? (
            <>
              <h6 className="red">Server Error, Try again later</h6>
            </>
          ) : (
            credError && (
              <>
                <h6 className="red">Invalid Credentials</h6>
              </>
            )
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value.toLowerCase())}
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
      </div>
    </>
  );
}
