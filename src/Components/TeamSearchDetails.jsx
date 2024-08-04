import React, { useEffect, useState } from "react";
import { formatPositionSpelling } from "../helpers/helper";
import captainPic from "../assets/captain.webp";
import placeHolder from "../assets/placeholder.png";
import { getUserData } from "../helpers/getUserData";
import { Info, Shield } from "lucide-react";
import "../Styles/teamSearch.css"; //contains css to 'crop' image

const TeamSearchDetails = ({
  selectedTeam,
  userDetails,
  setUserDetails,
  allTeams,
  setSelectedTeam,
  setSuccessMessage,
  setNavDetails,
}) => {
  const [teamRoster, setTeamRoster] = useState([]);
  const [renderJoinableTeams, setRenderJoinableTeams] = useState(false);

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (selectedTeam) {
      fetch(`${URL}/api/teams/${selectedTeam.id}/users`)
        .then((res) => res.json())
        .then((data) => setTeamRoster(data));
    }
  }, [selectedTeam]);

  function renderJoinButton() {
    const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;
    return selectedTeam[positionKeyWord] === null && userDetails.user_team_id === null;
  }

  function renderLeaveButton() {
    const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;
    return selectedTeam[positionKeyWord] === userDetails.id ? true : false;
  }

  function handleLeaveTeam() {
    const isPlayerCaptain = userDetails.id === selectedTeam.captain_id;
    const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;

    // Updating team info if captain leaves their team, assigns new captain and updates captain_id
    // if (isPlayerCaptain) {
    //   const {
    //     point_guard_id,
    //     small_forward_id,
    //     power_forward_id,
    //     center_id,
    //     shooting_guard_id,
    //   } = selectedTeam;
    //   const playerIDS = [
    //     point_guard_id,
    //     small_forward_id,
    //     power_forward_id,
    //     center_id,
    //     shooting_guard_id,
    //   ];
    //   const validPlayers = playerIDS.filter(
    //     (playerID) => playerID !== userDetails.id && playerID !== null
    //   );
    //   const randomIndex = Math.floor(Math.random() * validPlayers.length);
    //   const newCaptainID = validPlayers[randomIndex];
    //   const updatedTeamInfo = {
    //     ...selectedTeam,
    //     [positionKeyWord]: null,
    //     captain_id: newCaptainID,
    //   };
    //   const teamOptions = {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updatedTeamInfo),
    //   };

    //   fetch(`${URL}/api/teams/${selectedTeam.id}`, teamOptions)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setSelectedTeam(data);
    //       console.log("Successfully Updated Team!!!", data);
    //     })
    //     .catch((error) => console.error("Team Didn't Update", error));
    // }

    // // Updating Team Info if a player leaves their team
    // else {
    //   const updatedTeamInfo = { ...selectedTeam, [positionKeyWord]: null };

    //   const teamOptions = {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updatedTeamInfo),
    //   };
    //   fetch(`${URL}/api/teams/${selectedTeam.id}`, teamOptions)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setSelectedTeam(data);
    //       console.log("Successfully Updated Team!!!", data);
    //     })
    //     .catch((error) => console.error("Team Didn't Update", error));
    // }
    // // Updating User Info
    // const updatedUserInfo = { ...userDetails, user_team_id: null };
    // const options = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedUserInfo),
    // };
    // fetch(`${URL}/api/auth/user/${userDetails.id}`, options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUserDetails(data);
    //     setNavDetails(data);
    //     console.log("User Details Updated Successfully", data); // Logging the response data
    //   })
    //   .catch((error) => console.error("Updated User Details Failed", error));
  }

  function handleJoinTeam() {
    const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;
    const updatedTeamInfo = {
      ...selectedTeam,
      [positionKeyWord]: userDetails.id,
    };
    const teamOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeamInfo),
    };
    fetch(`${URL}/api/teams/${selectedTeam.id}`, teamOptions)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTeam(data);
        console.log("Successfully Updated Team!!!", data);
      })
      .catch((error) => console.error("Team Didn't Update", error));

    const updatedUserInfo = { ...userDetails, user_team_id: selectedTeam.id };
    const userOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserInfo),
    };
    fetch(`${URL}/api/auth/user/${userDetails.id}`, userOptions)
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
        setNavDetails(data);
        console.log("User Details Updated Successfully", data);
      })
      .catch((error) => console.error("Updated User Details Failed", error));

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  }

  return (
    <div>
      {selectedTeam ? (
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="py-8 bg-secondary/10 rounded-l-lg md:px-10">
            {selectedTeam && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <h1 className="bebas-neue-regular font-extrabold text-4xl">
                    {selectedTeam.team_name}
                  </h1>
                </div>
                <div className="flex justify-center">
                  {selectedTeam.team_pic ? (
                    <img
                      src={selectedTeam.team_pic}
                      alt="team_pic"
                      className="w-44 md:w-52 rounded-lg thumb"
                    />
                  ) : (
                    <div className="bg-secondary/5 w-44 h-44 md:w-52 md:h-52 flex justify-center items-center rounded border-2 border-secondary/5 px-3">
                      <hr className="border-2 border-primary/60 w-1/4" />
                      <Shield size={52} className="text-text/60" />
                      <hr className="border-2 border-accent/60 w-1/4" />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {renderJoinButton() ? (
                    <button
                      onClick={handleJoinTeam}
                      className="bg-accent border-2 border-accent text-white text-xl py-4 px-8 rounded-lg hover:bg-text/30 hover:border-2 hover:border-text/10 font-bold hover:text-text"
                    >
                      Join Team
                    </button>
                  ) : null}
                  {renderLeaveButton() === true ? (
                    <button
                      className="bg-accent border-2 border-accent text-white text-xl py-4 px-8 rounded-lg hover:bg-white hover:border-2 hover:border-red-500 font-bold hover:text-red-500"
                      onClick={handleLeaveTeam}
                    >
                      Leave Team
                    </button>
                  ) : null}
                </div>

                {/* STATS!!! */}
                <div>
                  <h2 className="text-white text-4xl bebas-neue-regular text-center">
                    Stats
                  </h2>
                  {selectedTeam && selectedTeam.matches_played > 0 ? (
                    <>
                      <div className="grid grid-cols-2 text-text text-2xl m-auto w-1/2 text-center">
                        <h3 className="flex justify-center">
                          <span className="p-2 mr-20 rounded-lg text-2xl lg:text-lg">Games Won</span>
                        </h3>
                        <h3 className="flex justify-center">
                          <span className="p-2 ml-20 rounded-lg text-2xl lg:text-lg">Games Lost</span>
                        </h3>
                      </div>
                      <div className="bg-background shadow-2xl rounded-lg p-2 flex w-1/2 m-auto">
                        <div className="bg-transparent rounded-full shadow-sm overflow-hidden w-full">
                          <div className="relative h-6 flex items-center">
                            <div
                              className="relative top-0 bottom-0 right-1 bg-primary py-1 shadow-xl"
                              style={{
                                width: `${
                                  (selectedTeam.team_wins / selectedTeam.matches_played) * 100
                                }%`,
                              }}
                            >
                              <div className="relative flex justify-center text-green-900 font-medium text-sm">
                                {selectedTeam.team_wins}
                              </div>
                            </div>

                            <div
                              className="relative top-0 bottom-0 left-1 bg-accent py-1 shadow-xl"
                              style={{
                                width: `${
                                  (selectedTeam.team_loss / selectedTeam.matches_played) * 100
                                }%`,
                              }}
                            >
                              <div className="relative flex justify-center text-red-900 font-medium text-sm">
                                {selectedTeam.team_loss}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-secondary/10 p-5 mt-5 rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col shadow-2xl lg:w-full w-1/2 m-auto">
                      <div className="flex flex-row items-center mb-2">
                        <span className="mr-5">
                          <Info size={28} className="text-primary/50" />
                        </span>
                        <span className="font-semibold">Not Enough Matches Played</span>
                      </div>
                      {/* <span className="ml-12">
                        To see this team's stats they'll have to play matches!
                      </span> */}
                      {selectedTeam.length === 5 ? (
                        <span
                          onClick={() => navigate(`/matches`)}
                          className="bg-primary/50 mt-5 p-2 px-3 rounded-lg ml-12 mr-auto border-2 border-secondary/40 hover:border-primary/30 hover:bg-secondary/20 shadow-xl cursor-pointer"
                        >
                          Play a Match
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ROSTER */}
          <div className="bg-secondary/10 rounded-r-lg flex justify-center">
            <table className="table-auto bg-background rounded-lg xl:mr-16 mb-8">
              {teamRoster.length > 0 && (
                <thead className="text-left uppercase">
                  <tr>
                    <th className="pl-7 py-4">Player</th>
                    <th className="pl-7 py-4">Position</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {teamRoster.map((player) => (
                  <tr
                    key={player.id}
                    className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100 max-md:flex-row"
                  >
                    <td className="px-6 py-5 text-black/80">
                      <div className="flex items-center m-auto">
                        <img
                          src={player.photo}
                          className="thumb w-16 mr-7 shadow-md shadow-gray-400 rounded"
                          alt={`${player.first_name} ${player.last_name}`}
                        />
                        <div className="mr-7">
                          {player.first_name} {player.last_name}{" "}
                          {player.id === selectedTeam.captain_id && (
                            <img src={captainPic} alt="Captain" className="w-8" />
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
      ) : (
        <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 max-sm:mb-7">
          <div className="flex">
            <span className="mr-5">
              <Info size={28} className="text-primary/50" />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold">Select a Team</span>
              <span>View their details and get all the insights you need!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSearchDetails;
