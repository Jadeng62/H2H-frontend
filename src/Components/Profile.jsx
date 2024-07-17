import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/getUserData";
import placeholderImage from "../assets/placeholder.png";
import UpcomingGames from "./UpcomingGames";
import PlayerCard from "./PlayerCard";

function Profile() {
  // const [userDetails, setUserDetails] = useState(null);

  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const user = await getUserData();
  //       if (user) {
  //         setUserDetails(user);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }

  //   getUser();
  // }, []);

  return (
    <div className="text-text flex flex-col">
      <div className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        <h2>My Player</h2>
      </div>
      <div className="flex flex-col p-8 sm:flex-row flex-grow gap-7">
        <div className="flex justify-center w-full sm:w-1/3 sm:mb-0">
          <PlayerCard />
        </div>
        <div className="flex justify-center sm:w-2/3 flex-grow">
          <UpcomingGames />
        </div>
      </div>
    </div>
  );
}

export default Profile;
