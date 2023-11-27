import React from "react";
import NavBar from "../components/NavBar";

export default function Sell() {
  return (
    <>
      <NavBar isHome={true} buy={false} />
      <h1>SELL</h1>
    </>
  );
}
