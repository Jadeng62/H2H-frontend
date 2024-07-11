import React, { useEffect, useState } from "react";
import playersData from "../DummyData/myTeam.json";
import { X, Accessibility, Award } from "lucide-react";
import MyTeamForm from "./MyTeamForm";
const MyTeam = () => {
  //   console.log(playersData.players);

  const [playersInTeam, setPlayersInTeam] = useState(null);
  //might need useState for captain so that we can compare captain ID with the current user/ team player
  const [isUserTeamCaptain, setIsUserTeamCaptain] = useState(false);

  const [teamData, setTeamData] = useState(null);

  const handleDelete = (playerID) => {
    console.log("Clicked delete for playerID:", playerID);
  };

  useEffect(() => {
    setPlayersInTeam(playersData.players);
  }, []);

  useEffect(() => {
    setTeamData(playersData.teams[0]);
  }, []);

  const handleWL = (w, l) => {
    const wLRatio = w / l;
    const flooredRatio = Math.floor(wLRatio * 10) / 10;
    return flooredRatio;
  };

  // Function to convert ISO 8601 date string to formatted date and time
  function dateToString(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      //   hour: "numeric",
      //   minute: "numeric",
      //   second: "numeric",
      //   timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  console.log("playersInTeam-->", playersInTeam);
  return (
    <div className="min-h-screen">
      <h1 className="bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
        My Team
      </h1>

      {!isUserTeamCaptain ? (
        <>
          {teamData && (
            <div className="mx-10 mb-5 mt-10">
              <div className="flex flex-row w-full md:w-1/2 bg-background rounded-lg">
                <div className=" rounded-l-xl">
                  {/* this is where we'd put the dynamic team icon */}
                  <Accessibility
                    size={96}
                    className="rounded-xl m-2 border-4 border-secondary bg-background text-primary"
                  />
                </div>
                <div className="flex flex-col p-1">
                  <div className="text-white text-3xl">
                    {teamData.team_name}
                  </div>
                  <div className="text-white text-2xl">
                    Total Matches: {teamData.matches_played}
                  </div>
                  <div className="flex flex-row">
                    <div className="text-white text-2xl">
                      Won:{" "}
                      <span className="text-primary">{teamData.team_wins}</span>
                    </div>
                    <div className="text-white text-2xl ml-4">
                      Lost:{" "}
                      <span className="text-accent">{teamData.team_loss}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background py-2 px-2 text-text inline-block rounded-lg mt-10">
                {" "}
                <div className="flex flex-row items-center">
                  <Award size={30} />
                  <span className="text-xl">
                    Balling since {dateToString(teamData.created_at)}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              {/* className=" flex justify-center" */}
              <div>
                <h2 className="text-white text-4xl bebas-neue-regular ml-10 mt-5 ">
                  Stats
                </h2>
                <div className="bg-red-400 p-16 flex mx-10 mb-10 mt-5">
                  <div className=" bg-green-300 p-2">Charts + metrics</div>
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <div className="flex flex-row items-center">
                  <h2 className="text-white text-4xl bebas-neue-regular ml-10 mt-5 mr-auto">
                    Roster
                  </h2>{" "}
                  {/* conditional render that should show add players to team button when length of team is less than 5 players */}
                  {playersInTeam && playersInTeam.length > 4 && (
                    <div className="text-white p-2 mt-4 bg-secondary rounded-lg hover:bg-accent mr-10">
                      Add Player
                    </div>
                  )}
                </div>
                <table className="table-auto bg-background rounded-lg mx-10 mb-10 mt-5">
                  <thead className="text-left uppercase text-text">
                    <tr>
                      <th className="pl-7 py-4">Player</th>
                      <th className="pl-7 py-4">Position</th>
                      <th className="px-6 py-4">
                        Wins <span>/</span> <span>Losses</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {playersInTeam &&
                      playersInTeam.map((player) => {
                        return (
                          // whitespace-nowrap
                          <tr
                            key={player.id}
                            className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100"
                          >
                            <td className="px-6 py-5 text-black/80">
                              {player.firstName} {player.lastName}
                            </td>
                            <td className="px-6 py-5">{player.position}</td>
                            <td className="px-6 py-5">
                              <div className="bg-background px-2 rounded inline-block">
                                <span className="text-primary font-bold">
                                  {player.userWins}
                                </span>{" "}
                                <span className="font-bold text-text">/</span>{" "}
                                <span className="text-accent font-bold">
                                  {player.userLosses}
                                </span>
                              </div>
                            </td>
                            {isUserTeamCaptain && (
                              <td>
                                <button
                                  className="py-5 pr-3 hover:text-red-500"
                                  onClick={() => handleDelete(player.id)}
                                >
                                  <X size={28} />
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {/* conditional render that should show add players to team button when length of team is less than 5 players */}
                {playersInTeam && playersInTeam.length > 4 && (
                  <div className="text-primary p-2 mx-10 mb-10 mt-4 bg-background rounded-md hover:bg-accent mr-10">
                    There's no I and team. You need a full team to play in
                    matches.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <MyTeamForm />
      )}
    </div>
  );
};

export default MyTeam;
