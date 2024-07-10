import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/getUserData";
import placeholderImage from "../assets/placeholder.png";
import { fakeUser } from "../helpers/fakeInfo";
import UpcomingGames from "./UpcomingGames";
import PlayerCard from "./PlayerCard";

function Profile() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) setUserDetails(user);
    }

    getUser();
  }, []);

  return (
    <div className="text-text h-screen">
      <div className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        <h2>My Player</h2>
      </div>
      <div className="flex flex-col p-8 sm:flex-row">
        <div className="flex justify-center mb-8 sm:w-1/3 sm:mb-0">
          <PlayerCard />
        </div>
        <div className="flex justify-center sm:w-2/3">
          <UpcomingGames />
        </div>
      </div>
    </div>
  );
}

export default Profile;
