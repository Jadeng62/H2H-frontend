import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpcomingGames = ({ userDetails }) => {
  const [upcomingGames, setUpcomingGames] = useState([]);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (userDetails && userDetails.id) {
      fetch(`${URL}/api/matches?player_id=${userDetails.id}`)
        .then((res) => res.json())
        .then((data) => setUpcomingGames(data));
    }
  }, [userDetails]); // Only run when userDetails changes

  function formattedDate(iso) {
    const date = new Date(iso);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${monthNames[month]} ${day}, ${year}`;
  }

  function formattedTime(iso) {
    const date = new Date(iso);
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    let period = "AM";

    // Convert hours to 12-hour format and determine AM/PM
    let formattedHour = hour;
    if (hour >= 12) {
      formattedHour = hour === 12 ? 12 : hour - 12;
      period = "PM";
    }
    if (formattedHour === 0) {
      formattedHour = 12; // 0 should be displayed as 12 AM
    }

    // Ensure minutes are formatted properly (e.g., "05" instead of "5")
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    return `${formattedHour}:${formattedMinute} ${period}`;
  }

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
                  <td className="px-6 py-5">{game.team2_id}</td>
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
