import React, { useState, useContext } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [PasswordMatchError, setPasswordMatchError] = useState(false);
  const [userExistsError, setuserExistsError] = useState(false);
  const [serverError, setserverError] = useState(false);

  const { setUser } = useContext(UserContext);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password !== cpassword) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
        const data = { name, email, password };
        const res = await axios.post("/user/register", data);
        if (res.data.success) {
          setuserExistsError(false);
          setserverError(false);
          setUser(res.data.user);
          navigate("/buy");
        } else {
          if (res.data.error === "email") {
            setuserExistsError(true);
          } else {
            setserverError(true);
          }
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <NavBar isLogin={false} />
      <div className="container">
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
              onChange={(e) => setemail(e.target.value)}
            />
            {userExistsError && (
              <>
                <h6 className="red">User with this email already exists</h6>
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
    </>
  );
  // <>
  //   <NavBar isLogin={false} />
  //   <div className="container">
  //     <form onSubmit={onSubmit}>
  //       <div className="mb-3">
  //         <label htmlFor="name" className="form-label">
  //           Name
  //         </label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="name"
  //           value={name}
  //           onChange={(e) => {
  //             return setname(e.target.value);
  //           }}
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="email" className="form-label">
  //           Email
  //         </label>
  //         <input
  //           type="email"
  //           className="form-control"
  //           id="email"
  //           value={email}
  //           onChange={(e) => setemail(e.target.value)}
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="password" className="form-label">
  //           Password
  //         </label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           id="password"
  //           value={password}
  //           onChange={(e) => setpassword(e.target.value)}
  //         />
  //         {PasswordMatchError && (
  //           <>
  //             <h6 className="red">password's do not match!</h6>
  //           </>
  //         )}
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="Cpassword" className="form-label">
  //           Confirm Password
  //         </label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           id="Cpassword"
  //           value={cpassword}
  //           onChange={(e) => setcpassword(e.target.value)}
  //         />
  //         {PasswordMatchError && (
  //           <>
  //             <h6 className="red">password's do not match!</h6>
  //           </>
  //         )}
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Register
  //       </button>
  //     </form>
  //   </div>
  // </>
}
