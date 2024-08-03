import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditMyTeam from "./EditMyTeam.jsx";
import Modal from "react-modal";
import playersData from "../DummyData/myTeam.json";
import placeHolder from "../assets/placeholder.png";
import "../Styles/badges.css";
import {
  X,
  Accessibility,
  Award,
  Pencil,
  Info,
  Users,
  User,
  Shield,
} from "lucide-react";
import MyTeamForm from "./MyTeamForm";
import { getUserData } from "../helpers/getUserData.js";
import captainPic from "../assets/captain.webp";

const MyTeam = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // user obj w/ user data
  const [userDetails, setUserDetails] = useState(null);
  // team obj w/ playerIDs, matches, captain id, etc
  const [teamData, setTeamData] = useState(null);
  // an array of team member user objs
  const [playersInTeam, setPlayersInTeam] = useState(null);
  //might need useState for captain so that we can compare captain ID with the current user/ team player
  const [isUserTeamCaptain, setIsUserTeamCaptain] = useState(false);
  // state for targeting which player is selected
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  // state for updating players' team id
  const [playerData, setPlayerData] = useState(null);
  // modal usestates
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for array of all existing badges
  const [existingBadges, setExistingBadges] = useState([]);
  // state for array of all badges a team has
  const [teamBadges, setTeamBadges] = useState([]);

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

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function capitalizeFirstLetter(string) {
    let words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    let capitalizedString = words.join(" ");
    return capitalizedString;
  }

  const handleWL = (w, l) => {
    const wLRatio = w / l;
    const flooredRatio = Math.floor(wLRatio * 10) / 10;
    return flooredRatio;
  };

  // modal fx
  const openModal = () => {
    setIsModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  const closeModal = () => {
    setIsModalOpen(false);
    //refetch team data after modal closes
    if (userDetails && userDetails.user_team_id) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => {
          setTeamData(data);
        })
        .catch((error) => console.error("Error fetching team data:", error));
    }
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

    const updatedPlayer = { user_team_id: null }; // update that player's teamID at that playerID to null

    //put request to update team object
    fetch(`${URL}/api/teams/${userDetails.user_team_id}`, {
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
        setTeamData(updatedTeamData); // setting updated team data

        //after team is updated now update that specific player obj
        return fetch(`${URL}/api/auth/user/${playerID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPlayer),
        });
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update player.");
        }
        console.log("Player updated successfully");
        setPlayerData(updatedPlayer);
        setSelectedPlayer(playerID);
        // Optionally update UI or perform further actions
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  // get logged in user
  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUserDetails(user);
      }
    }

    getUser();
  }, []);

  // useEffect for saying selector/generator
  // useEffect(() => {
  //   selectRandomSaying();
  // }, []);

  // sets captainstate for user, and teamdata needed for this view
  useEffect(() => {
    if (userDetails) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => {
          // Update teamData state with the entire team data
          setTeamData(data);
          // Check if current user is team captain
          if (teamData.captain_id === userDetails.id) {
            setIsUserTeamCaptain(true);
          } else {
            setIsUserTeamCaptain(false);
          }
        })
        .catch((error) =>
          console.error("Error fetching team data and players:", error)
        );
    }
  }, [userDetails]);

  // sets state with all players on the user's team
  useEffect(() => {
    if (userDetails) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}/users`)
        .then((res) => res.json())
        .then((data) => {
          setPlayersInTeam(data);
        })
        .catch((error) =>
          console.error("Error fetching team data and players:", error)
        );
    }
  }, [userDetails, teamData]);

  // uncomment to check if a player's team id is changed to null once a captain them from a team
  useEffect(() => {
    if (selectedPlayer) {
      fetch(`${URL}/api/auth/user/single/${selectedPlayer}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Selected Player:", data);
        })
        .catch((error) =>
          console.error("Error fetching team data and players:", error)
        );
    }
  }, [selectedPlayer]);

  useEffect(() => {
    if (userDetails) {
      fetch(`${URL}/api/badges`)
        .then((res) => res.json())
        .then((data) => {
          setExistingBadges(data);
          console.log("Badges Data:", existingBadges);
          return fetch(`${URL}/api/badges/teams/${userDetails.user_team_id}`)
            .then((res) => res.json())
            .then((data) => {
              setTeamBadges(data);
              console.log("These are the current team Badges:", teamBadges);
            });
        })
        .catch((error) => console.error("Error fetching badges data"));
    }
  }, [userDetails, teamBadges.length]);

  if (!userDetails || !teamData) {
    return null;
  }

  if (!userDetails || !teamData) {
    return null;
  }

  //   // modal fx
  //   const openModal = () => {
  //     setIsModalOpen(true);
  //   };

  //   // const closeModal = () => {
  //   //   setIsModalOpen(false);
  //   // };
  //   const closeModal = () => {
  //     setIsModalOpen(false);
  //     //refetch team data after modal closes
  //     if (userDetails && userDetails.user_team_id) {
  //       fetch(`${URL}/api/teams/${userDetails.user_team_id}`)

  return (
    <div className="min-h-screen">
      {/* {console.log(isUserTeamCaptain)} */}
      <div
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dvmczcg3f/image/upload/t_crop/v1721837757/Head%202%20Head/basketball_courts_ezeu10.jpg')`,
          // backgrounImage: `url('https://res.cloudinary.com/dvmczcg3f/image/upload/v1721839263/Head%202%20Head/Screenshot_2024-07-24_at_12.40.56_PM_tzqtdj.png')`,
          backgroundSize: "auto", // Adjust the image size as needed
          backgroundPosition: "center", // Center the image
        }}
      >
        <h1 className="bg-background/70  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
          My Team
        </h1>
      </div>
      {/* <div className="bg-secondary/30 py-5"></div> */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          {/* className=" flex justify-center" */}
          {teamData && (
            <div className="mx-10 mb-5 mt-10 ">
              <div className="flex justify-between w-full bg-background shadow-2xl border-4 border-secondary/10 rounded-lg p-3">
                <div className="flex flex-row">
                  {/* this is where we'd put the dynamic team icon */}
                  {/* <Accessibility
                    size={96}
                    className="rounded-xl m-2 border-4 border-secondary bg-background text-primary"
                  /> */}
                  {/*                       {teamData.team_pic && isValidUrl(teamData.team_pic) ? (
-Carlitos changed this since we can upload team photos now */}
                  {teamData.team_pic ? (
                    <img
                      src={teamData.team_pic}
                      alt="team_pic"
                      className="w-24 h-24 md:w-36 md:h-36 border-secondary/5 border-2 rounded-md thumb"
                    />
                  ) : (
                    <div className="bg-secondary/5 w-24 h-24 md:w-36 md:h-36 flex justify-center items-center rounded-md border-2 border-secondary/5 px-3">
                      <hr className="border-2 border-primary/60 w-1/4" />
                      <Shield size={72} className="text-text/60" />
                      <hr className="border-2 border-accent/60 w-1/4" />{" "}
                    </div>
                  )}
                  {/* <img
                        src={teamData.team_pic}
                        alt="team_pic"
                        className="w-24 md:w-36 border-secondary border-4 m-2"
                      /> */}
                  <div className="pl-1 ml-2">
                    <div className="text-white text-3xl flex">
                      {teamData.team_name}{" "}
                    </div>
                    <div className="text-white text-2xl">
                      Total Matches: {teamData.matches_played}
                    </div>
                  </div>
                </div>
                {/* functionality that only allows captains to edit */}
                {/* added modal for toggling editteam.jsx when Pencil is clicked */}
                {teamData.captain_id === userDetails.id && (
                  <div className="mt-1 mr-1">
                    <span
                      className=" text-accent/90 hover:text-primary cursor-pointer"
                      onClick={openModal}
                    >
                      <Pencil size={28} />
                    </span>
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      className="modal-content h-screen shadow-lg relative"
                      overlayClassName="modal-overlay fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm z-1"
                      appElement={document.getElementById("root")}
                    >
                      <EditMyTeam closeModal={closeModal} />
                    </Modal>
                  </div>
                )}
              </div>
              <div className="bg-secondary/10 p-2 text-text inline-block rounded-lg mt-10 shadow-2xl">
                {" "}
                <div className="flex flex-row items-center">
                  <Award size={30} className="text-amber-400" />
                  <span className="text-xl pr-1">
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
            {teamData && teamData.matches_played > 0 ? (
              <>
                <div className="grid grid-cols-2 text-text text-2xl mx-10 mt-5">
                  <h3 className="flex justify-center">
                    <span className="  p-2 rounded-lg">Games Won</span>
                  </h3>
                  <h3 className="flex justify-center">
                    <span className="  p-2 rounded-lg">Games Lost</span>
                  </h3>
                </div>
                <div className="bg-background shadow-2xl rounded-lg p-2 flex mx-10">
                  <div className="bg-transparent rounded-full shadow-sm overflow-hidden w-full">
                    <div className="relative h-6 flex items-center ">
                      {/* Win bar */}
                      <div
                        className="relative top-0 bottom-0 right-1  bg-primary py-1 shadow-xl"
                        style={{
                          width: `${
                            (teamData.team_wins / teamData.matches_played) * 100
                          }%`,
                        }}
                      >
                        <div className="relative flex justify-center text-green-900 font-medium text-sm">
                          {teamData.team_wins}
                        </div>
                      </div>

                      {/* Loss bar */}
                      <div
                        className="relative top-0 bottom-0 left-1 bg-accent py-1 shadow-xl"
                        style={{
                          width: `${
                            (teamData.team_loss / teamData.matches_played) * 100
                          }%`,
                        }}
                      >
                        <div className="relative flex justify-center text-red-900 font-medium text-sm">
                          {teamData.team_loss}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-secondary/10 p-5 mt-5 mx-10 rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col shadow-2xl">
                  <div className="flex flex-row items-center mb-2">
                    <span className="mr-5">
                      <Info size={28} className="text-primary/50" />
                    </span>
                    <span className="font-semibold">Not Enough Data</span>
                  </div>
                  <span className="ml-12">
                    To see your team stats, you have to play in more matches!
                  </span>
                  {playersInTeam && playersInTeam.length === 5 ? (
                    <span
                      onClick={() => navigate(`/matches`)}
                      className="bg-primary/50 mt-5 p-2 px-3 rounded-lg ml-12 mr-auto border-2 border-secondary/40 hover:border-primary/30 hover:bg-secondary/20 shadow-xl cursor-pointer"
                    >
                      Play a Match
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className=" grid grid-col-1 mx-10">
          <div className="">
            <div className="flex flex-row items-center">
              <h2 className="text-white text-4xl bebas-neue-regular mt-10">
                Roster
              </h2>{" "}
              {/* conditional render that should show add players to team button when length of team is less than 5 players */}
              {/* {playersInTeam && playersInTeam.length < 5 && (
                    <span className="text-white p-2 mt-10 bg-accent/80 rounded-lg hover:bg-secondary/30 ml-auto shadow-2xl cursor-pointer">
                      Add Player
                    </span>
                  )} */}
            </div>
            <table className="table-auto bg-background rounded-lg mb-5 mt-5 w-full shadow-2xl">
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
                          <span className="mr-4">
                            {player.photo || isValidUrl(player.photo) ? (
                              <img
                                src={player.photo}
                                alt="player_profile_pic"
                                className="w-14 rounded shadow-md shadow-gray-400 thumb"
                              />
                            ) : (
                              <img
                                src={placeHolder}
                                alt="player_profile_pic"
                                className="w-14 rounded shadow-md shadow-gray-400"
                              />
                            )}
                          </span>{" "}
                          {/* {player.first_name} {player.last_name} */}
                          <div className="mr-7">
                            {player.first_name} {player.last_name}{" "}
                            {player.id === teamData.captain_id && (
                              <img src={captainPic} alt="" className="w-8" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {capitalizeFirstLetter(player.position)}
                        </td>
                        {teamData &&
                        player.id !== teamData.captain_id &&
                        userDetails.id === teamData.captain_id ? (
                          <td>
                            <button
                              className="py-5 hover:text-red-400"
                              onClick={() => handleDelete(player.id)}
                            >
                              <X size={30} />
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
            {playersInTeam && playersInTeam.length < 5 ? (
              <div className=" p-5 flex flex-col rounded-lg text-text text-lg border-4 bg-secondary/10 border-secondary/10 shadow-2xl">
                <div className="flex flex-row items-center mb-2">
                  <span className="mr-5">
                    <Users size={28} className="text-primary/50" />
                  </span>
                  <span className="font-semibold">Not Enough Players</span>
                </div>
                <span className="ml-12">
                  Make sure team roster is full to continue participating in
                  matches.
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-white text-4xl bebas-neue-regular ml-10 mt-10 ">
        Badges
      </h2>
      <div className="bg-secondary/10 mt-5 mx-10 lg:mb-10 rounded-lg text-text text-lg border-4 border-secondary/10 shadow-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pb-12 overflow-y-auto h-96 md:h-124 gap-8 relative">
        {existingBadges &&
          existingBadges.length > 0 &&
          existingBadges.map((badge) => {
            // Check if the team owns the badge
            const hasBadge = teamBadges.some(
              (teamBadge) => teamBadge.id === badge.id
            );
            const fillerBadge = {
              name: "???",
              description: "???",
              icon_url:
                "https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_1:1/v1722370751/bricks_yqytdl.jpg",
            };
            // Use either the actual badge or the filler badge
            const badgeToDisplay = hasBadge ? badge : fillerBadge;

            return (
              <div className="flex flex-col items-center  mt-5">
                <div className="bg-background/80 py-1 px-2 rounded flex flex-row items-center border-2 border-amber-500/75 text-balance text-center">
                  {badgeToDisplay.name}
                </div>
                <div className="hexagon w-20 h-24 md:w-32 md:h-36 bg-amber-500/100 shadow-2xl">
                  <div className="hexagon-inner h-20 w-18 md:h-32 md:w-28 bg-secondonary/10 bg-amber-500/100 shadow-inner">
                    <div
                      className="bg-background/90 p-8 md:p-12 md:border-8 rounded-full absolute border-4 border-background"
                      style={{
                        backgroundImage: `url('${badgeToDisplay.icon_url}')`,
                        backgroundSize: "cover", // Adjust the image size as needed
                        backgroundPosition: "center", // Center the image
                      }}
                    ></div>
                  </div>
                </div>
                <div className="bg-background  py-0.5 px-1 md:py-1 md:px-2 flex justify-center text-center rounded mx-3 border-2 border-secondary/5">
                  {badgeToDisplay.description}
                </div>
              </div>
            );
          })}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-background/80 py-1 px-2 rounded ">???</div>
          <div className="hexagon w-20 h-24 md:w-32 md:h-36 bg-secondary/50 shadow-2xl">
            <div className="hexagon-inner h-20 w-18 md:h-32 md:w-28 bg-secondonary/10 bg-secondary/0 shadow-inner">
              <div className="bg-background/90 p-8 md:p-12 md:border-8 rounded-full absolute border-4 border-background"></div>
            </div>{" "}
          </div>
          <div className="bg-background border-2 py-0.5 px-1 md:py-1 md:px-2 flex justify-center text-center rounded">
            ???
          </div>
        </div>
      </div>
      <h2 className="text-white text-4xl bebas-neue-regular ml-10 mt-10 ">
        Checking Existing Badges
      </h2>
      <div className="bg-secondary/10 mt-5 mx-10 lg:mb-10 rounded-lg text-text text-lg border-4 border-secondary/10 shadow-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pb-12 overflow-y-auto h-96 md:h-124 gap-8 relative">
        {existingBadges &&
          existingBadges.length > 0 &&
          existingBadges.map((badge) => {
            return (
              <div className="flex flex-col items-center  mt-5">
                <div className="bg-background/80 py-1 px-2 rounded flex flex-row items-center border-2 border-amber-500/75 text-balance text-center">
                  {badge.name}
                </div>
                <div className="hexagon w-20 h-24 md:w-32 md:h-36 bg-amber-500/100 shadow-2xl">
                  <div className="hexagon-inner h-20 w-18 md:h-32 md:w-28 bg-secondonary/10 bg-amber-500/100 shadow-inner">
                    <div
                      className="bg-background/90 p-8 md:p-12 md:border-8 rounded-full absolute border-4 border-background"
                      style={{
                        backgroundImage: `url('${badge.icon_url}')`,
                        backgroundSize: "cover", // Adjust the image size as needed
                        backgroundPosition: "center", // Center the image
                      }}
                    ></div>
                  </div>
                </div>
                <div className="bg-background  py-0.5 px-1 md:py-1 md:px-2 flex justify-center text-center rounded mx-3 border-2 border-secondary/5">
                  {badge.description}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyTeam;
