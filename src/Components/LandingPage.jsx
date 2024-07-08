import React from "react";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <div className=" h-screen bebas-neue-regular bg-black">
        <div className="absolute left-1/3 pr-3 top-28">
          <h1 className="text-7xl leading-normal text-text ">Your</h1>
          <h1 className="text-7xl leading-normal text-text">Game,</h1>
          <h1 className="text-7xl leading-normal text-text">Your</h1>
          <h1 className="text-7xl leading-normal text-text">Glory.</h1>
          <div
            className="bg-primary/30 hover:bg-quaternary text-3xl py-1 px-5 inline-block rounded text-text text-ceter shadow-lg z-10 mt-8 hover:animate-pulse"
            onClick={handleClick}
          >
            Enter Here
          </div>
        </div>
        <Spline scene="https://prod.spline.design/0w8vKpTFODVPNR1c/scene.splinecode" />
      </div>
    </>
  );
};

export default LandingPage;
