import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/getUserData";
import placeholderImage from "../assets/placeholder.png";
import UpcomingGames from "./UpcomingGames";
import PlayerCard from "./PlayerCard";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [userTeam, setUserTeam] = useState({});

  const [upcomingGames, setUpcomingGames] = useState([]);

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getUser() {
      try {
        const user = await getUserData();
        if (user) {
          setUserDetails(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.user_team_id !== null) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => setUserTeam(data));
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails && userDetails.id) {
      fetch(`${URL}/api/matches?player_id=${userDetails.id}`)
        .then((res) => res.json())
        .then(async (data) => {
          const gamesWithTeamNames = await Promise.all(
            data.map(async (game) => {
              const opponentId =
                userDetails.user_team_id === game.team1_id
                  ? game.team2_id
                  : game.team1_id;
              const res = await fetch(`${URL}/api/teams/${opponentId}`);
              const team = await res.json();
              return {
                ...game,
                opponentTeamName: team.team_name,
              };
            })
          );
          setUpcomingGames(gamesWithTeamNames);
        });
    }
  }, [userDetails]);

  return (
    <div className="text-text flex flex-col">
      <div className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        <h2>My Profile</h2>
      </div>
      <div className="flex flex-col mt-10 mb-20 mx-10 sm:flex-row gap-7">
        <div
          className="flex justify-center w-full sm:w-1/3 sm:mb-0"
          style={{ maxHeight: "565px" }}
        >
          <PlayerCard userDetails={userDetails} userTeam={userTeam} />
        </div>
        <div
          className="flex justify-center sm:w-2/3"
          style={{ maxHeight: "565px" }}
        >
          <UpcomingGames
            upcomingGames={upcomingGames}
            userDetails={userDetails}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
