import React from "react";

const LandingPage = () => {
  return (
    <>
      <div className=" h-screen bg-background bebas-neue-regular">
        <h1 className="text-7xl leading-normal text-left text-text px-10 pt-10">
          Your
        </h1>
        <h1 className="text-7xl leading-normal text-left text-text px-24">
          Game,
        </h1>
        <h1 className="text-7xl leading-normal text-left text-text px-48">
          Your
        </h1>
        <h1 className="text-7xl leading-normal text-right text-accent px-10 ">
          Glory.
        </h1>
        <div className="flex justify-center pt-10 px-10">
          <h2 className="text-4xl  font-bold text-balance rounded p-1  text-secondary border-4 border-quaternary shadow-lg text-center">
            Welcome to H2H, the ultimate pick up basketball experience.
          </h2>
        </div>
        <div className="flex justify-center p-10">
          <div className="bg-primary hover:bg-quaternary text-3xl py-1 px-10 inline-block rounded text-black shadow-lg">
            Enter Here
          </div>
        </div>
        {/* <div className="py-10 bg-quaternary"></div> */}
      </div>
    </>
  );
};

export default LandingPage;
