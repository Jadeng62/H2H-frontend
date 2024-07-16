import React, { useEffect, useState } from "react";
import playersData from "../DummyData/myTeam.json";
import { X, Accessibility, Award, Pencil } from "lucide-react";
import MyTeamForm from "./MyTeamForm";

const MyTeam = ({ userDetails }) => {
  const URL = import.meta.env.VITE_BASE_URL;
  // user obj w/ user data
  const myUserDetails = { ...userDetails };
  // team obj w/ playerids, matches, captain id, etc
  const [teamData, setTeamData] = useState(null);
  // an array of team member user objs
  const [playersInTeam, setPlayersInTeam] = useState(null);
  //might need useState for captain so that we can compare captain ID with the current user/ team player
  const [isUserTeamCaptain, setIsUserTeamCaptain] = useState(false);
  // state for current saying
  const [currentSaying, setCurrentSaying] = useState("");

  // array of sayings for when a user still needs a full team to play
  const sayings = [
    "The game requires a full team lineup; assemble your squad!",
    "Complete your team roster before stepping onto the field of play.",
    "Remember, a complete team is essential for game participation.",
    "No substitutions for a full team; gather your players!",
    "Team up! You need a full squad to hit the field.",
    "Game on! Ensure your team is complete for match day.",
    "Can't play solo; recruit your team for match participation.",
    "Don't leave gaps on the roster; a full team is required.",
    "Check your lineup; a complete team is necessary for gameplay.",
    "There's no I and team. You need a full team to play in matches.",
  ];

  // const total = wins + losses;
  // {teamData.matches_played;}
  // const winPercentage = (wins / total) * 100;
  // ({teamData.team_wins}/{teamData.matches_played}) * 100
  // const lossPercentage = (losses / total) * 100;
  //// ({teamData.team_loss}/{teamData.matches_played}) * 100

  // function to cycle through sayings to encourage user to get a full team in order to play matches
  const selectRandomSaying = () => {
    const randomIndex = Math.floor(Math.random() * sayings.length);
    setCurrentSaying(sayings[randomIndex]);
  };

  // Function to convert ISO 8601 date string to formatted date and time
  function dateToString(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  const handleWL = (w, l) => {
    const wLRatio = w / l;
    const flooredRatio = Math.floor(wLRatio * 10) / 10;
    return flooredRatio;
  };

  const handleDelete = (playerID) => {
    console.log("Clicked delete for playerID:", playerID);
    const updatedTeamData = {
      ...teamData,
      // Update the specific position field to null based on playerID
      point_guard_id:
        playerID === teamData.point_guard_id ? null : teamData.point_guard_id,
      shooting_guard_id:
        playerID === teamData.shooting_guard_id
          ? null
          : teamData.shooting_guard_id,
      small_forward_id:
        playerID === teamData.small_forward_id
          ? null
          : teamData.small_forward_id,
      power_forward_id:
        playerID === teamData.power_forward_id
          ? null
          : teamData.power_forward_id,
      center_id: playerID === teamData.center_id ? null : teamData.center_id,
    };
    fetch(`${URL}/api/teams/${myUserDetails.user_team_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTeamData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update team.");
        }
        setTeamData(updatedTeamData);
        console.log("Team updated successfully.");
        console.log(teamData);
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  // useEffect for saying selector/generator
  useEffect(() => {
    selectRandomSaying();
  }, []);

  // sets captainstate for user, and teamdata needed for this view
  useEffect(() => {
    if (myUserDetails.user_team_id) {
      fetch(`${URL}/api/teams/${myUserDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => {
          // Update teamData state with the entire team data
          setTeamData(data);
          // Check if current user is team captain
          if (captain_id === myUserDetails.id) {
            setIsUserTeamCaptain(true);
          } else {
            setIsUserTeamCaptain(false);
          }
        })
        .catch((error) =>
          console.error("Error fetching team data and players:", error)
        );
    }
  }, [myUserDetails.user_team_id]);

  // sets state with all players on the user's team
  useEffect(() => {
    if (myUserDetails.user_team_id) {
      fetch(`${URL}/api/teams/${myUserDetails.user_team_id}/users`)
        .then((res) => res.json())
        .then((data) => {
          setPlayersInTeam(data);
        })
        .catch((error) =>
          console.error("Error fetching team data and players:", error)
        );
    }
  }, [myUserDetails.user_team_id, teamData]);

  console.log("This is the teamData:", teamData);

  return (
    <div className="min-h-screen">
      <h1 className="bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
        My Team
      </h1>

      {myUserDetails && myUserDetails.user_team_id ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              {/* className=" flex justify-center" */}
              {teamData && (
                <div className="mx-10 mb-5 mt-10 ">
                  <div className="flex flex-row w-full bg-background shadow-2xl border-4 border-white/10 rounded-lg p-3">
                    <div className=" rounded-l-xl">
                      {/* this is where we'd put the dynamic team icon */}
                      {/* <Accessibility
                    size={96}
                    className="rounded-xl m-2 border-4 border-secondary bg-background text-primary"
                  /> */}
                      <img
                        src={teamData.team_pic}
                        alt="team_pic"
                        className="w-36 border-secondary border-4 m-2"
                      />
                    </div>
                    <div className="flex flex-col p-1 ml-2">
                      <div className="text-white text-3xl flex">
                        {teamData.team_name}{" "}
                        <span className="ml-auto">
                          <Pencil size={28} />
                        </span>
                      </div>
                      <div className="text-white text-2xl">
                        Total Matches: {teamData.matches_played}
                      </div>
                      {/* <div className="flex flex-row">
                    <div className="text-white text-2xl">
                      Won:{" "}
                      <span className="text-primary">{teamData.team_wins}</span>
                    </div>
                    <div className="text-white text-2xl ml-4">
                      Lost:{" "}
                      <span className="text-accent">{teamData.team_loss}</span>
                    </div>
                  </div> */}
                    </div>
                  </div>
                  <div className="bg-secondary/10 p-2 text-text inline-block rounded-lg mt-10 shadow-2xl">
                    {" "}
                    <div className="flex flex-row items-center">
                      <Award size={30} className="text-amber-400" />
                      <span className="text-xl">
                        Balling since {dateToString(teamData.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-white text-4xl bebas-neue-regular ml-10 mt-10 ">
                  Stats
                </h2>
                <div className="grid grid-cols-2 text-text text-2xl mx-10">
                  <h3 className="flex justify-center">
                    <span className="  p-2 rounded-lg">Games Won</span>
                  </h3>
                  <h3 className="flex justify-center">
                    <span className="  p-2 rounded-lg">Games Lost</span>
                  </h3>
                </div>
                <div className="bg-background shadow-2xl rounded-lg p-3 flex mx-10">
                  {teamData && teamData.matches_played > 0 ? (
                    <>
                      <div className="bg-transparent rounded-full shadow-sm overflow-hidden w-full">
                        <div className="relative h-6 flex items-center ">
                          {/* Win bar */}
                          <div
                            className="relative top-0 bottom-0 right-1  bg-primary py-1"
                            style={{
                              width: `${
                                (teamData.team_wins / teamData.matches_played) *
                                100
                              }%`,
                            }}
                          >
                            <div className="relative flex justify-center text-green-900 font-medium text-sm">
                              {teamData.team_wins}
                            </div>
                          </div>

                          {/* Loss bar */}
                          <div
                            className="relative top-0 bottom-0 left-1 bg-accent py-1"
                            style={{
                              width: `${
                                (teamData.team_loss / teamData.matches_played) *
                                100
                              }%`,
                            }}
                          >
                            <div className="relative flex justify-center text-red-900 font-medium text-sm">
                              {teamData.team_loss}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-secondary p-2 rounded-lg">
                        Not enough data for metrics
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className=" grid grid-col-1 mx-10">
              <div className="">
                <div className="flex flex-row items-center">
                  <h2 className="text-white text-4xl bebas-neue-regular mt-10">
                    Roster
                  </h2>{" "}
                  {/* conditional render that should show add players to team button when length of team is less than 5 players */}
                  {playersInTeam && playersInTeam.length > 4 && (
                    <span className="text-white p-2 mt-10 bg-secondary/30 rounded-lg hover:bg-accent ml-auto shadow-2xl cursor-pointer">
                      Add Player
                    </span>
                  )}
                </div>
                <table className="table-auto bg-background rounded-lg mb-5 mt-5 w-full">
                  <thead className="text-left uppercase text-text">
                    <tr>
                      <th className="pl-7 py-4">Player</th>
                      <th className="pl-7 py-4">Position</th>
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
                            {/* <td>
                              <img
                                src={player.photo}
                                alt="player_photo's"
                                className="w-12 h-12 rounded-lg"
                              />
                            </td> */}
                            <td className="px-6 py-5 text-black/80 flex items-center">
                              <span>
                                <img
                                  src={player.photo}
                                  alt="player_profile_pic"
                                  className="w-8 mr-4"
                                />
                              </span>{" "}
                              {player.first_name} {player.last_name}
                            </td>
                            <td className="px-6 py-5">{player.position}</td>
                            {teamData && player.id !== teamData.captain_id ? (
                              <td>
                                <button
                                  className="py-5 pr-3 hover:text-red-500"
                                  onClick={() => handleDelete(player.id)}
                                >
                                  <X size={28} />
                                </button>
                              </td>
                            ) : (
                              <>
                                {/* this div is to fill the white space an x creates in form for captain's */}
                                <div></div>
                              </>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {/* conditional render that should show add players to team button when length of team is less than 5 players */}
                {playersInTeam && playersInTeam.length > 4 && (
                  <div className="text-primary p-2 mx-10 mb-10 mt-4 bg-background rounded-md flex justify-center">
                    ***{currentSaying}***
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>test</div>
        </>
        // <MyTeamForm />
      )}
    </div>
  );
};

export default MyTeam;
