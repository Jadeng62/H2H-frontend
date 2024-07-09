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
      <div className=" min-h-screen md:h-full bebas-neue-regular bg-black/50">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-center pt-12 md:pt-24">
            <h1 className="text-8xl md:text-9xl leading-normal text-text ">
              Your
            </h1>
            <h1 className="text-8xl md:text-9xl leading-normal text-text">
              Game,
            </h1>
            <h1 className="text-8xl md:text-9xl leading-normal text-text">
              Your
            </h1>
            <h1 className="text-8xl md:text-9xl leading-normal text-text">
              Glory.
            </h1>
          </div>
          <div className="relative md:pt-24">
            {/* <div className="text-white">Test</div> */}
            <Spline scene="https://prod.spline.design/qJC6TQ-7nqlfJN9x/scene.splinecode" />
            <div className=" absolute top-1/3 md:top-64 left-0 w-full flex justify-center mt-12">
              <div
                className="bg-accent/90 text-3xl py-4 px-10 inline-block rounded text-text text-ceter shadow-lg hover:animate-pulse cursor-pointer"
                onClick={handleClick}
              >
                Enter Here
              </div>
            </div>
            {/* <Spline scene="https://prod.spline.design/qJC6TQ-7nqlfJN9x/scene.splinecode" /> */}
          </div>
          {/* <div className="relative left-1/3 pr-3 top-36">
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
        </div> */}
          {/* <Spline scene="https://prod.spline.design/0w8vKpTFODVPNR1c/scene.splinecode" /> */}
          {/* <Spline scene="https://prod.spline.design/0w8vKpTFODVPNR1c/scene.splinecode" /> */}
          {/* <Spline scene="https://prod.spline.design/0w8vKpTFODVPNR1c/scene.splinecode" /> */}
          {/* <Spline scene="https://prod.spline.design/0w8vKpTFODVPNR1c/scene.splinecode" /> */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
