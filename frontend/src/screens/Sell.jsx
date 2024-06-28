import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sell() {
  const [city, setcity] = useState("default");
  const [year, setyear] = useState("default");
  const [model, setmodel] = useState("default");
  const [make, setmake] = useState("default");
  const [color, setcolor] = useState("default");
  const [mileage, setmileage] = useState(0);
  const [price, setprice] = useState(0);
  const [pictures, setpictures] = useState([]);
  const [description, setdescription] = useState("");
  const [cityError, setcityError] = useState(false);
  const [yearError, setyearError] = useState(false);
  const [modelError, setmodelError] = useState(false);
  const [makeError, setmakeError] = useState(false);
  const [colorError, setcolorError] = useState(false);
  const [mileageError, setmileageError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [picturesError, setpicturesError] = useState(false);

  const navigate = useNavigate();
  const onSelect = (value, setvalue, seterror) => {
    seterror(value === "default");
    setvalue(value);
  };
  const handleDescription = (value, setvalue, seterror) => {
    seterror(value.replace(/\s+/g, "").trim() === "");
    setvalue(value);
  };
  const handlePrice = (value, setvalue, seterror) => {
    seterror(value < 90000);
    setvalue(value);
  };
  const handleMileage = (value, setvalue, seterror) => {
    seterror(value <= 0);
    setvalue(value);
  };
  const handlePics = (e) => {
    setpictures([...pictures, ...Array.from(e.target.files)]);
    setpicturesError(e.target.files.length === 0);
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        city !== "default" &&
        make !== "default" &&
        color !== "default" &&
        year !== "default" &&
        description !== "" &&
        price >= 90000 &&
        mileage > 0 &&
        pictures.length > 0
      ) {
        const formData = new FormData(); // it is a built in class used to send files to the server
        formData.append("city", city);
        formData.append("year", year);
        formData.append("make", make);
        formData.append("color", color);
        formData.append("mileage", mileage);
        formData.append("price", price);
        formData.append("description", description);
        pictures.forEach((picture) => {
          formData.append("pictures", picture);
        });

        const res = await axios.post("/ad/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.success) {
          navigate("/");
        } else {
          alert("Failed to post ad");
        }
      } else {
        setcityError(city === "default");
        setmakeError(make === "default");
        setcolorError(color === "default");
        setyearError(year === "default");
        setdescriptionError(description.replace(/\s+/g, "").trim() === "");
        setpriceError(price < 90000);
        setmileageError(mileage <= 0);
        setpicturesError(pictures.length === 0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div style={{backgroundColor:"#5C8374",height:"1000px"}} >
      <NavBar isHome={true} buy={false} />
      
      <div className="container" style={{backgroundColor:"#1B4242",marginTop:"20px",padding:"12px"}} >
        <form encType="multipart/form-data" onSubmit={onSubmit}>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              value={city}
              onChange={(e) => onSelect(e.target.value, setcity, setcityError)}
            >
              <option value="default">Select City</option>
              <option value="Kannur">Kannur</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Kasargod">Kasargod</option>
              <option value="Malappuram">Malappuram</option>
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
              value={year}
              onChange={(e) => onSelect(e.target.value, setyear, setyearError)}
            >
              <option value="default">Select Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
            </select>
            {yearError && (
              <>
                <h6 className="badge bg-danger">Select Year</h6>
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
              <option value="Other">Other</option>
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
          <div className="mb-3 form-floating">
            <textarea
              className="form-control"
              id="description"
              style={{ height: "100px" }}
              value={description}
              onChange={(e) =>
                handleDescription(
                  e.target.value,
                  setdescription,
                  setdescriptionError
                )
              }
            ></textarea>
            <label htmlFor="description">Description</label>
            {descriptionError && (
              <>
                <h6 className="badge bg-danger">Description is required</h6>
              </>
            )}
          </div>
          <div className="mb-3 form-floating">
            <input
              type="number"
              className="form-control"
              id="price"
              value={price === 0 ? "" : price}
              onChange={(e) =>
                handlePrice(e.target.value, setprice, setpriceError)
              }
            />
            <label htmlFor="price">Price (INR)</label>
            {priceError && (
              <>
                <h6 className="badge bg-danger">Select a Realistic Price</h6>
              </>
            )}
          </div>
          <div className="mb-3 form-floating">
            <input
              type="number"
              className="form-control"
              id="mileage"
              value={mileage === 0 ? "" : mileage}
              onChange={(e) =>
                handleMileage(e.target.value, setmileage, setmileageError)
              }
            />
            <label htmlFor="price">Mileage (Km)</label>
            {mileageError && (
              <>
                <h6 className="badge bg-danger">Select Mileage</h6>
              </>
            )}
          </div>
          <div className="mb-3 ">
            <div className="input-group">
              {" "}
              <input
                type="file"
                accept="image/*"
                multiple
                className="form-control"
                id="pictures"
                onChange={handlePics}
              />
              <button className="btn btn-success" disabled id="pictures">
                Upload Pictures
              </button>
            </div>

            {picturesError && (
              <>
                <h6 className="badge bg-danger">Upload a Picture</h6>
              </>
            )}
            {pictures.length > 0 && (
              <div className="d-flex flex-wrap">
                {pictures.map((picture, index) => (
                  <div key={index} className="m-2">
                    <img
                      alt="..."
                      src={URL.createObjectURL(picture)}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "contain",
                        border: "3px solid black",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {cityError ||
          makeError ||
          colorError ||
          descriptionError ||
          yearError ||
          priceError ||
          mileageError ||
          picturesError ? (
            <>
              <button className="btn btn-danger" disabled>
                Details are not complete
              </button>
            </>
          ) : (
            <button className="btn btn-primary" type="submit">
              Submit Ad
            </button>
          )}
        </form>
      </div>
      </div>
    </>
  );
}
