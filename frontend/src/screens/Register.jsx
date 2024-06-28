import React, { useState, useContext } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [contactError, setcontactError] = useState(false);
  const [PasswordMatchError, setPasswordMatchError] = useState(false);
  const [userExistsError, setuserExistsError] = useState(false);
  const [serverError, setserverError] = useState(false);

  const { setUser } = useContext(UserContext);

  const onSubmit = async (e) => {
    try {
      setuserExistsError(false);
      setserverError(false);
      setcontactError(false);
      setPasswordMatchError(false);
      e.preventDefault();
      if (password !== cpassword) {
        setPasswordMatchError(true);
        if (!/^91\d{10}$/.test(contact)) {
          setcontactError(true);
        }
      } else {
        if (!/^91\d{10}$/.test(contact)) {
          setcontactError(true);
          if (password !== cpassword) {
            setPasswordMatchError(true);
          }
        } else {
          setcontactError(false);
          setPasswordMatchError(false);
          const data = { name, email, contact, password };
          const res = await axios.post("/user/register", data);
          if (res.data.success) {
            setuserExistsError(false);
            setserverError(false);
            setUser(res.data.user);
            navigate("/");
            // alert("User Registered");
          } else {
            if (res.data.error === "email") {
              setuserExistsError(true);
            } else {
              setserverError(true);
            }
          }
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div style={{backgroundColor:"#9EC8B9", height:"729px"}} >
      <NavBar isLogin={false} />
      <div className="container" style={{ marginTop:"20px"}}>
        {serverError && (
          <>
            <h6 className="red">Server Error, Try again later</h6>
          </>
        )}
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
              onChange={(e) => setemail(e.target.value.toLowerCase())}
            />
            {userExistsError && (
              <>
                <h6 className="red">User with this email already exists</h6>
              </>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact (91XXXXXXXXXX)
            </label>
            <input
              type="number"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
            />
            {contactError && (
              <>
                <h6 className="red">Phone number is invalid </h6>
              </>
            )}
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
            {PasswordMatchError && (
              <>
                <h6 className="red">password's do not match!</h6>
              </>
            )}
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
            {PasswordMatchError && (
              <>
                <h6 className="red">password's do not match!</h6>
              </>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
      </div>
    </>
  );
}
