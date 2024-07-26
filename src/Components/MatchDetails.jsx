import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  formatPositionSpelling,
  formattedDate,
  formattedTime,
  isTeamFull,
} from "../helpers/helper";
import captainPic from "../assets/captain.webp";
import { Pencil, Info } from "lucide-react";

const MatchDetails = ({ upcomingGames, userDetails }) => {
  const [match, setMatch] = useState({});
  const { id } = useParams();
  const [userTeam, setUserTeam] = useState({});
  const [firstTeamDetails, setFirstTeamDetails] = useState(null);
  const [firstTeamRoster, setFirstTeamRoster] = useState([]);
  const [secondTeamDetails, setSecondTeamDetails] = useState(null);
  const [secondTeamRoster, setSecondTeamRoster] = useState([]);

  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

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
          } else if (match.team1_id === null) {
            setFirstTeamDetails(null);
          }
          if (match.team2_id) {
            const secondTeamRes = await fetch(
              `${URL}/api/teams/${match.team2_id}`
            );
            const secondTeamData = await secondTeamRes.json();
            setSecondTeamDetails(secondTeamData);
          } else if (match.team1_id === null) {
            setFirstTeamDetails(null);
          }
        } catch (error) {
          console.error("Error fetching team details:", error);
        }
      }
    };
    fetchTeams();
  }, [match.team1_id, match.team2_id]);

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
  }, [firstTeamDetails, secondTeamDetails, match]);

  const handleJoinMatch = (teamString) => {
    const newlyJoinedTeam = {
      ...match,
      [teamString]: userDetails.user_team_id,
    };
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newlyJoinedTeam),
    };

    fetch(`${URL}/api/matches/${id}`, options)
      .then((res) => res.json())
      .then((data) => setMatch(data));
    console.log("Joined Match");
  };

  const handleLeaveMatch = () => {
    let teamKeyWord = "";
    if (userDetails.user_team_id === firstTeamDetails.id) {
      teamKeyWord = "team1_id";
    } else if (userDetails.user_team_id === secondTeamDetails.id) {
      teamKeyWord = "team2_id";
    }

    const updatedMatchInfo = { ...match, [teamKeyWord]: null };

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMatchInfo),
    };

    fetch(`${URL}/api/matches/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        if (teamKeyWord === "team1_id") {
          setFirstTeamRoster([]);
          setFirstTeamDetails(null);
        } else if (teamKeyWord === "team2_id") {
          setSecondTeamRoster([]);
          setSecondTeamDetails(null);
        }
      });
    console.log("You LEft the match");
  };

  const handleDeleteMatch = () => {
    // Only the creator can see delete button
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${URL}/api/matches/${id}`, options).then(() => navigate("/matches"));
  };

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
                        isTeamFull(userTeam) && (
                          <div className="mt-3">
                            <button
                              className="hover:bg-accent py-2 px-4 rounded-lg w-fit bg-primary/30"
                              onClick={() => handleJoinMatch("team1_id")}
                            >
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
        <div className="">
          <h1 className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
            Vs
          </h1>
          <div className="flex justify-center">
            
            <div className="" style={{ marginTop: "50%" }}>
              
              <table className="table-auto bg-accent rounded-lg mx-10 mb-4">
              
                <thead className="text-left uppercase">
                
                  <tr>
                    <th className="pl-7 py-4">Match Details</th>
                    <br/>
                    {/* add onClick={openModal} to span for editmatch when component is connected */}
                    <span className=" hover:text-primary/90 text-text cursor-pointer flex justify-center">
                          <Pencil size={28} />
                    </span>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100">
                    <td className="px-6 py-5 text-black">Location:</td>
                    <td className="px-6 py-5">{`${match.park_name}\n${match.address}`}</td>
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
              <div className="flex justify-center">
                <div className="m-4">
                  {userDetails &&
                    secondTeamDetails &&
                    userDetails.id === secondTeamDetails.captain_id && (
                      <button
                        className="bg-accent py-3 px-2 rounded-lg"
                        onClick={handleLeaveMatch}
                      >
                        Leave Match
                      </button>
                    )}
                </div>
                <div className="" style={{ marginBottom: "50%" }}>
                  {match &&
                    userDetails &&
                    match.creator_id === userDetails.id && (
                      <button
                        className="bg-accent py-3 px-2 rounded-lg"
                        onClick={handleDeleteMatch}
                      >
                        Delete Match
                      </button>
                    )}
                </div>
              </div>
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
                        isTeamFull(userTeam) && (
                          <div className="mt-3">
                            <button
                              className="hover:bg-accent py-2 px-4 rounded-lg w-fit bg-primary/30"
                              onClick={() => handleJoinMatch("team2_id")}
                            >
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
