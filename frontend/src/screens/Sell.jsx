import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sell() {
  const [city, setcity] = useState("default");
  const [year, setyear] = useState("");
  const [model, setmodel] = useState("");
  const [make, setmake] = useState("default");
  const [color, setcolor] = useState("default");
  const [mileage, setmileage] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [cityError, setcityError] = useState(false);
  const [yearError, setyearError] = useState(false);
  const [modelError, setmodelError] = useState(false);
  const [makeError, setmakeError] = useState(false);
  const [colorError, setcolorError] = useState(false);
  const [mileageError, setmileageError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);

  const navigate = useNavigate();
  const onSelect = (value, setvalue, seterror) => {
    seterror(value === "default");
    setvalue(value);
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (city !== "default" && make !== "default" && color !== "default") {
        alert("Form Submitted");
      } else {
        setcityError(city === "default");
        setmakeError(make === "default");
        setcolorError(color === "default");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <NavBar isHome={true} buy={false} />
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              value={city}
              onChange={(e) => onSelect(e.target.value, setcity, setcityError)}
            >
              <option value="default">Select City</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Quetta">Quetta</option>
              <option value="Peshawar">Peshawar</option>
            </select>
            {cityError && (
              <>
                <h6 className="badge bg-danger">Select City</h6>
              </>
            )}
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              value={make}
              onChange={(e) => onSelect(e.target.value, setmake, setmakeError)}
            >
              <option value="default">Select Make</option>
              <option value="Honda">Honda</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Toyota">Toyota</option>
              <option value="Kia">Kia</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Daihatsu">Daihatsu</option>
            </select>
            {makeError && (
              <>
                <h6 className="badge bg-danger">Select Make</h6>
              </>
            )}
          </div>
          <div className="mb-3">
            {" "}
            <select
              className="form-select"
              aria-label="Default select example"
              value={color}
              onChange={(e) =>
                onSelect(e.target.value, setcolor, setcolorError)
              }
            >
              <option value="default">Select Color</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Silver">Silver</option>
              <option value="Grey">Grey</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
              <option value="Orange">Orange</option>
              <option value="Purple">Purple</option>
              <option value="Brown">Brown</option>
              <option value="Pink">Pink</option>
              <option value="Maroon">Maroon</option>
              <option value="Biege">Biege</option>
              <option value="Indigo">Indigo</option>
              <option value="Violet">Violet</option>
            </select>
            {colorError && (
              <>
                <h6 className="badge bg-danger">Select Color</h6>
              </>
            )}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit Application
          </button>
          <br />
          {(cityError || makeError || colorError) && (
            <>
              <h6 className="badge bg-danger">Incomplete Details</h6>
            </>
          )}
        </form>
      </div>
    </>
  );
}
