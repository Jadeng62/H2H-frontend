import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formattedDate, formattedTime } from "../helpers/helper";

const UpcomingGames = ({ userDetails }) => {
  const [upcomingGames, setUpcomingGames] = useState([]);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

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
    <div className="border-2 border-white bg-secondary/30 rounded-lg w-full h-full mb-10">
      <div className="align-middle flex">
        <h1 className="text-4xl font-extrabold bebas-neue-regular p-4">
          Upcoming Games
        </h1>
      </div>
      {userDetails && userDetails.user_team_id === null ? (
        <div className="inline-flex justify-center flex-col items-center bg-secondary/30 py-4 mx-auto w-full sm:mt-20">
          <h1 className="text-center text-xl font-bold">
            Join or Create a Team Now!
          </h1>
          <button
            className="mt-4 bg-primary hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={() => navigate("/myTeam")}
          >
            +
          </button>
        </div>
      ) : userDetails && upcomingGames.length > 0 ? (
        <div className="px-4 pb-4 flex relative overflow-x-auto overflow-y-auto">
          <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-text uppercase bg-accent">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Time
                </th>
                <th scope="col" className="px-6 py-4">
                  Match Up
                </th>
              </tr>
            </thead>
            <tbody>
              {upcomingGames.map((game) => (
                <tr className="bg-white border-b" key={game.id}>
                  <th
                    scope="row"
                    className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {formattedDate(game.start_datetime)}
                  </th>
                  <td className="px-6 py-5">
                    {formattedTime(game.start_datetime)}
                  </td>
                  <td className="px-6 py-5">{game.opponentTeamName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="inline-flex justify-center flex-col items-center bg-secondary/30 py-4 mx-auto w-full sm:mt-20">
          <h1 className="text-center text-xl font-bold">
            Your Team Has No Upcoming Matches
          </h1>
          <h1 className="text-center text-xl font-bold my-4">
            Click Here to View Matches
          </h1>
          <button
            className=" bg-primary hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={() => navigate("/myTeam")}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingGames;
