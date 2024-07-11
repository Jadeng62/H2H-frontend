import React from "react";
import { fakeUser } from "../helpers/fakeInfo";
import placeholderImage from "../assets/placeholder.png";
import { ShieldHalf } from "lucide-react";

const PlayerCard = () => {
  return (
    <div className="grid grid-rows-6 border-4 w-80 mr-6 bebas-neue-regular rounded-xl bg-gradient-to-tr from-orange-400 to-orange-700">
      <div className="flex flex-col justify-center row-span-2 p-4 text-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl">New York Snails</h1>
          {/* <ShieldHalf className="mb-1 mx-1" size={26} /> */}
        </div>
        <div className="">
          <h1 className="text-5xl font-bold text-primary ">{`${fakeUser.first_name} ${fakeUser.last_name}`}</h1>
        </div>
      </div>
      <div className="flex justify-center row-span-2">
        <img src={placeholderImage} alt="" className="w-36 h-36 rounded-xl" />
      </div>
      <div className="flex flex-col row-span-2 text-2xl justify-center text-center">
        <h1>Position: Point Guard</h1>
        <div className="flex justify-center">
          <ShieldHalf size={42} />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
