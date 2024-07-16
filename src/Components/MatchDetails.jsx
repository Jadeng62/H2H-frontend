import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  formatPositionSpelling,
  formattedDate,
  formattedTime,
} from "../helpers/helper";
import captainPic from "../assets/captain.webp";

const MatchDetails = ({ upcomingGames, userTeam }) => {
  const [match, setMatch] = useState({});
  const { id } = useParams();
  const [firstTeamDetails, setFirstTeamDetails] = useState(null);
  const [firstTeamRoster, setFirstTeamRoster] = useState([]);
  const [secondTeamDetails, setSecondTeamDetails] = useState(null);
  const [secondTeamRoster, setSecondTeamRoster] = useState([]);

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const foundMatch = upcomingGames.find((game) => game.id === +id);
    if (foundMatch) {
      setMatch(foundMatch);
    }
  }, [upcomingGames, id]);

  useEffect(() => {
    const fetchTeams = async () => {
      if (match.id) {
        try {
          const firstTeamRes = await fetch(
            `${URL}/api/teams/${match.team1_id}`
          );
          const firstTeamData = await firstTeamRes.json();
          setFirstTeamDetails(firstTeamData);

          const secondTeamRes = await fetch(
            `${URL}/api/teams/${match.team2_id}`
          );
          const secondTeamData = await secondTeamRes.json();
          setSecondTeamDetails(secondTeamData);
        } catch (error) {
          console.error("Error fetching team details:", error);
        }
      }
    };
    fetchTeams();
  }, [match.id]);

  useEffect(() => {
    const fetchRosters = async () => {
      if (firstTeamDetails?.id && secondTeamDetails?.id) {
        try {
          const firstTeamRosterRes = await fetch(
            `${URL}/api/teams/${firstTeamDetails.id}/users`
          );
          const firstTeamRosterData = await firstTeamRosterRes.json();
          setFirstTeamRoster(firstTeamRosterData);

          const secondTeamRosterRes = await fetch(
            `${URL}/api/teams/${secondTeamDetails.id}/users`
          );
          const secondTeamRosterData = await secondTeamRosterRes.json();
          setSecondTeamRoster(secondTeamRosterData);
        } catch (error) {
          console.error("Error fetching team rosters:", error);
        }
      }
    };
    fetchRosters();
  }, [firstTeamDetails, secondTeamDetails]);

  return (
    <div className="text-text">
      <div className="grid grid-cols-3 max-sm:grid-cols-1">
        <div>
          <h1 className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
            {firstTeamDetails && firstTeamDetails.team_name}
          </h1>
          <div className="flex justify-center">
            <table
              className="table-auto bg-background rounded-lg mx-10 w-fit"
              style={{ marginTop: "15%", marginBottom: "15%" }}
            >
              <thead className="text-left uppercase">
                <tr>
                  <th className="pl-7 py-4">Player</th>
                  <th className="pl-7 py-4"> Position</th>
                </tr>
              </thead>
              <tbody>
                {firstTeamRoster &&
                  firstTeamRoster.map((player) => (
                    <tr
                      key={player.id}
                      className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100 max-md:flex-row"
                    >
                      <td className="px-6 py-5 text-black/80">
                        <div className="flex items-center m-auto">
                          <img src={player.photo} className="w-16 mr-7" />
                          <div className="mr-7">
                            {player.first_name} {player.last_name}{" "}
                            {player.id === firstTeamDetails.captain_id && (
                              <img
                                src={captainPic}
                                alt=""
                                className="w-8" // Added ml-3 and md:ml-5 for additional margin
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {formatPositionSpelling(player.position)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="">
          <h1 className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
            Vs
          </h1>
          <div className="flex justify-center">
            <div className="">
              <table
                className="table-auto bg-accent rounded-lg mx-10"
                style={{ marginTop: "50%", marginBottom: "50%" }}
              >
                <thead className="text-left uppercase">
                  <tr>
                    <th className="pl-7 py-4">Match Details</th>
                    {/* <th className="pl-7 py-4">Input</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100">
                    <td className="px-6 py-5 text-black">Location:</td>
                    <td className="px-6 py-5">{`${match.address} ${match.city}, ${match.state} ${match.zip}`}</td>
                  </tr>
                  <tr className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100">
                    <td className="px-6 py-5 text-black">Date:</td>
                    <td className="px-6 py-5">
                      {formattedDate(match.start_datetime)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100">
                    <td className="px-6 py-5 text-black">Time:</td>
                    <td className="px-6 py-5">
                      {formattedTime(match.start_datetime)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100">
                    <td className="px-6 py-5 text-black">Winner</td>
                    <td className="px-6 py-5">
                      {match.completed ? match.match_winner : "TBD"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100">
                    <td className="px-5 py-5 text-black">
                      Player of the Match
                    </td>
                    <td className="px-6 py-5">TBD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
            {secondTeamDetails && secondTeamDetails.team_name}
          </h1>
          <div className="flex justify-center">
            <table
              className="table-auto bg-background rounded-lg mx-10 w-fit"
              style={{ marginTop: "15%", marginBottom: "15%" }}
            >
              <thead className="text-left uppercase">
                <tr>
                  <th className="pl-7 py-4">Player</th>
                  <th className="pl-7 py-4"> Position</th>
                </tr>
              </thead>
              <tbody>
                {secondTeamRoster &&
                  secondTeamRoster.map((player) => (
                    <tr
                      key={player.id}
                      className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100 max-md:flex-row"
                    >
                      <td className="px-6 py-5 text-black/80">
                        <div className="flex items-center m-auto">
                          <img src={player.photo} className="w-16 mr-7" />
                          <div className="mr-7">
                            {player.first_name} {player.last_name}{" "}
                            {player.id === secondTeamDetails.captain_id && (
                              <img
                                src={captainPic}
                                alt=""
                                className="w-8" // Added ml-3 and md:ml-5 for additional margin
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 ml-7">
                        {formatPositionSpelling(player.position)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
