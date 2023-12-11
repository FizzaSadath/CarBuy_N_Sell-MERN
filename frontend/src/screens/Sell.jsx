import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

export default function Sell() {
  const [body, settype] = useState("");
  const [year, setyear] = useState("2000");
  const [price, setprice] = useState(100000);
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [color, setcolor] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <NavBar isHome={true} buy={false} />
    </>
  );
}
