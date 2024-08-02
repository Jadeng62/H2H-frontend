import React, { useEffect, useState } from "react";
import { formatPositionSpelling } from "../helpers/helper";
import captainPic from "../assets/captain.webp";
import placeHolder from "../assets/placeholder.png";
import { getUserData } from "../helpers/getUserData";
import { Info, Shield } from "lucide-react";
import "../Styles/teamSearch.css";

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
    // console.log("current team", selectedTeam);
    // console.log("user details", userDetails);
    return selectedTeam[positionKeyWord] === null &&
      userDetails.user_team_id === null
      ? true
      : false;
  }

  function handleJoinTeam() {
    // Assuming userDetails and selectedTeam are available in the scope
    const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;
    // Updating Team Key Route
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
    // Updating User Route
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
        console.log("User Details Updated Successfully", data); // Logging the response data
      })
      .catch((error) => console.error("Updated User Details Failed", error));

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, "3000");
  }

  return (
    <div className="">
      {selectedTeam ? (
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="py-8 bg-secondary/10 rounded-l-lg md:px-10 ">
            {selectedTeam && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <h1 className="text-4xl">{selectedTeam.team_name}</h1>
                </div>
                <div className="flex justify-center">
                  {/* Replace this with team logo or pic */}
                  {/* <img
                    src={placeHolder}
                    alt=""
                    className="w-44 md:w-52 rounded-lg"
                  /> */}
                  {selectedTeam.team_pic ? (
                    <img
                      src={selectedTeam.team_pic}
                      alt="team_pic"
                      // className="w-24 h-24 md:w-24 md:h-24 border-secondary/5 border-2 rounded thumb"
                      className="w-44 md:w-52 rounded-lg thumb"
                    />
                  ) : (
                    <div className="bg-secondary/5 w-44 h-44 md:w-52 md:h-52 flex justify-center items-center rounded border-2 border-secondary/5 px-3">
                      <hr className="border-2 border-primary/60 w-1/4" />
                      <Shield size={52} className="text-text/60" />
                      <hr className="border-2 border-accent/60 w-1/4" />{" "}
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {renderJoinButton() === true ? (
                    <button
                      onClick={handleJoinTeam}
                      className="text-white text-xl py-3 px-4 bg-accent rounded-md lg:w-1/3 md:w-1/5 hover:bg-secondary/30 shadow-2xl cursor-pointer"
                    >
                      Join Team
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          {/* This is the Team Roster */}
          <div className=" bg-secondary/10 rounded-r-lg flex justify-center">
            <table className="table-auto bg-background rounded-lg xl:mr-16 mb-8">
              {teamRoster.length > 0 && (
                <thead className="text-left uppercase">
                  <tr>
                    <th className="pl-7 py-4">Player</th>
                    <th className="pl-7 py-4"> Position</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {teamRoster &&
                  teamRoster.map((player) => (
                    <tr
                      key={player.id}
                      className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100 max-md:flex-row"
                    >
                      <td className="px-6 py-5 text-black/80">
                        <div className="flex items-center m-auto">
                          <img
                            src={player.photo}
                            className="thumb w-16 mr-7 rounded"
                          />
                          <div className="mr-7">
                            {player.first_name} {player.last_name}{" "}
                            {player.id === selectedTeam.captain_id && (
                              <img src={captainPic} alt="" className="w-8" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {formatPositionSpelling(player.position)}
                      </td>
                    </tr>
                  ))}
                {}
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
