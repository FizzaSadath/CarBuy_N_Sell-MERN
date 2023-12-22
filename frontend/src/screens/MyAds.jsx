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
                  {displayImages(ad.pictures)}
                  <p className="card-text">{ad.description}</p>
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
