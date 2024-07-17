import React, { useState, useEffect } from "react";
import { fakeUser } from "../helpers/fakeInfo";
import { getUserData } from "../helpers/getUserData";
import placeholderImage from "../assets/placeholder.png";
import { ShieldHalf } from "lucide-react";
import profileBg from "../assets/profile-bg.jpeg";

const PlayerCard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userTeam, setUserTeam] = useState({});

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUserDetails(user);
      }
    }

    getUser();
  }, []);

  if (!userDetails) return null;

  return (
    <div
      className="grid grid-rows-6 border-4 w-full sm:w-80 bebas-neue-regular rounded-xl text-black"
      style={{
        backgroundImage: `url(${profileBg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col justify-center row-span-2 p-4 text-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl">{userTeam && userTeam.team_name}</h1>
          {/* <ShieldHalf className="mb-1 mx-1" size={26} /> */}
        </div>
        <div>
          {userDetails && (
            <h1 className="text-5xl font-bold text-black ">{`${userDetails.first_name} ${userDetails.last_name}`}</h1>
          )}
          <h1 className="text-2xl">
            {userTeam &&
              userDetails &&
              (userTeam.captain_id === userDetails.id ? "Captain" : "Player")}
          </h1>
        </div>
      </div>
      <div className="flex justify-center row-span-2">
        <img src={userDetails.photo} alt="" className="w-36 h-36 rounded-xl" />
      </div>
      <div className="flex flex-col row-span-2 text-2xl justify-center text-center text-white">
        {userDetails && (
          <h1>
            <span>Position:</span> {userDetails.position}
          </h1>
        )}
        <div className="flex justify-center">
          <ShieldHalf size={42} />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
