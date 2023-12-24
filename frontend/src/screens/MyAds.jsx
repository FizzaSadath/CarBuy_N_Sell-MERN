import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
function MyAds() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("ad/my");
        if (response.data.success) {
          setAds(response.data.ads);
        } else {
          alert("Failed to fetch ads");
        }
      } catch (error) {
        console.log("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  const remove = async (e, id) => {
    try {
      e.preventDefault();
      // console.log(id);
      const res = await axios.delete(`ad/delete/${id}`);
      if (res.data.success) {
        window.location.reload();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const displayImages = (imageDataArray) => {
    try {
      if (imageDataArray && imageDataArray.length > 0) {
        if (
          imageDataArray[0] &&
          imageDataArray[0].data &&
          imageDataArray[0].contentType
        ) {
          return (
            <img
              src={`data:image/jpeg;base64,${imageDataArray[0].data}`}
              className="card-img-top img-fluid rounded mx-auto d-block"
              alt="..."
            />
          );
        }
        return null;
      }
      return null;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <NavBar isHome={true} />
      {ads.length === 0 ? (
        <>loading...</>
      ) : (
        <div className="container row">
          {ads.map((ad) => (
            <div className="col-sm" key={ad._id}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h4 className="card-title">
                    {ad.make} ({ad.year})
                  </h4>
                  <h5 className="card-title"> PKR {ad.price}</h5>
                  <h6 className="card-title">{ad.city}</h6>
                  <h6 className="card-title">Mileage: {ad.mileage} Km</h6>
                  {/* <h6>{ad._id}</h6> */}
                  {displayImages(ad.pictures)}
                  <p className="card-text">{ad.description}</p>

                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={"#modal" + ad._id}
                  >
                    Remove
                  </button>

                  <div
                    className="modal fade"
                    id={"modal" + ad._id}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Are you sure you want to remove this ad?
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            No
                          </button>
                          <button
                            onClick={(e) => {
                              // console.log(ad._id);
                              remove(e, ad._id);
                            }}
                            type="button"
                            className="btn btn-primary"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MyAds;
