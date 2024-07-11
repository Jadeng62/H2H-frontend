import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/getUserData";
import placeholderImage from "../assets/placeholder.png";
import { fakeUser } from "../helpers/fakeInfo";
import UpcomingGames from "./UpcomingGames";
import PlayerCard from "./PlayerCard";
import { fetchUser } from "../helpers/fetchUser";

function Profile() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [userTeam, setUserTeam] = useState("");

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUserDetails(user);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    if (userDetails) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => setUserTeam(data))
        .catch((error) => console.error("Error fetching team data:", error));
    }
  }, [userDetails]);

  return (
    <div className="text-text flex flex-col">
      <div className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        <h2>My Player</h2>
      </div>
      <div className="flex flex-col p-8 sm:flex-row flex-grow gap-7">
        <div className="flex justify-center w-full sm:w-1/3 sm:mb-0">
          <PlayerCard userDetails={userDetails} />
        </div>
        <div className="flex justify-center sm:w-2/3 flex-grow">
          <UpcomingGames />
        </div>
      </div>
    </div>
  );
}

export default Profile;
