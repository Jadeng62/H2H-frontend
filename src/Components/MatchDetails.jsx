import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  formatPositionSpelling,
  formattedDate,
  formattedTime,
} from "../helpers/helper";
import captainPic from "../assets/captain.webp";
import { Info } from "lucide-react";

const MatchDetails = ({ upcomingGames, userDetails }) => {
  const [match, setMatch] = useState({});
  const { id } = useParams();
  const [userTeam, setUserTeam] = useState({});
  const [firstTeamDetails, setFirstTeamDetails] = useState(null);
  const [firstTeamRoster, setFirstTeamRoster] = useState([]);
  const [secondTeamDetails, setSecondTeamDetails] = useState(null);
  const [secondTeamRoster, setSecondTeamRoster] = useState([]);

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${URL}/api/matches/${id}`)
      .then((res) => res.json())
      .then((data) => setMatch(data));
  }, [id]);

  useEffect(() => {
    if (userDetails) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => setUserTeam(data));
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchTeams = async () => {
      if (match.id) {
        try {
          if (match.team1_id) {
            const firstTeamRes = await fetch(
              `${URL}/api/teams/${match.team1_id}`
            );
            const firstTeamData = await firstTeamRes.json();
            setFirstTeamDetails(firstTeamData);
          }
          if (match.team2_id) {
            const secondTeamRes = await fetch(
              `${URL}/api/teams/${match.team2_id}`
            );
            const secondTeamData = await secondTeamRes.json();
            setSecondTeamDetails(secondTeamData);
          }
        } catch (error) {
          console.error("Error fetching team details:", error);
        }
      }
    };
    fetchTeams();
  }, [match.id]);

  useEffect(() => {
    const fetchRosters = async () => {
      if (firstTeamDetails !== null) {
        try {
          const firstTeamRosterRes = await fetch(
            `${URL}/api/teams/${firstTeamDetails.id}/users`
          );
          const firstTeamRosterData = await firstTeamRosterRes.json();
          setFirstTeamRoster(firstTeamRosterData);
        } catch (error) {
          console.log("Couldn't Fetch First Team Roster");
        }
      }
      if (secondTeamDetails !== null) {
        try {
          const secondTeamRosterRes = await fetch(
            `${URL}/api/teams/${secondTeamDetails.id}/users`
          );
          const secondTeamRosterData = await secondTeamRosterRes.json();
          setSecondTeamRoster(secondTeamRosterData);
        } catch (error) {
          console.log("Couldn't Fetch Second Team Roster");
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
            {firstTeamDetails ? firstTeamDetails.team_name : "TBD"}
          </h1>
          <div className="flex justify-center">
            {firstTeamRoster.length > 0 ? (
              <table
                className="table-auto bg-background rounded-lg mx-10 w-fit"
                style={{ marginTop: "15%", marginBottom: "15%" }}
              >
                <thead className="text-left uppercase">
                  <tr>
                    <th className="pl-7 py-4">Player</th>
                    <th className="pl-7 py-4">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {firstTeamRoster.map((player) => (
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
                              <img src={captainPic} alt="" className="w-8" />
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
            ) : (
              <div style={{ marginTop: "15%", marginBottom: "15%" }}>Hello</div>
            )}
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
                    <td className="px-6 py-5">{`${match.address}`}</td>
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
            {secondTeamDetails ? secondTeamDetails.team_name : "TBD"}
          </h1>
          <div className="flex justify-center">
            {secondTeamRoster.length > 0 ? (
              <table
                className="table-auto bg-background rounded-lg mx-10 w-fit"
                style={{ marginTop: "15%", marginBottom: "15%" }}
              >
                <thead className="text-left uppercase">
                  <tr>
                    <th className="pl-7 py-4">Player</th>
                    <th className="pl-7 py-4">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {secondTeamRoster.map((player) => (
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
                              <img src={captainPic} alt="" className="w-8" />
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
            ) : (
              <div style={{ marginTop: "15%", marginBottom: "15%" }}>
                <div className="bg-secondary/10 p-5 mx-10 rounded-lg text-text text-lg border-4 border-secondary/10 max-sm:mb-7">
                  <div className="flex">
                    <span className="mr-5">
                      <Info size={28} className="text-green-500" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold">Slot Available</span>
                      <span>
                        This slot is currently available for a team to join and
                        play a match. Sign up now to participate!
                      </span>
                      {userDetails &&
                        userTeam &&
                        userDetails.id === userTeam.captain_id &&
                        match.team1_id !== userDetails.user_team_id &&
                        match.team2_id !== userDetails.user_team_id &&
                        userTeam.point_guard_id !== null &&
                        userTeam.shooting_guard_id !== null &&
                        userTeam.small_forward_id !== null &&
                        userTeam.power_forward_id !== null &&
                        userTeam.center_id !== null && (
                          <div className="mt-3">
                            <h1>Click Here</h1>
                            <button className="hover:bg-accent py-2 px-4 rounded-lg w-fit bg-primary/30">
                              Join Match!
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
