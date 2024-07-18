import React, { useEffect, useState } from "react";
import { formatPositionSpelling } from "../helpers/helper";
import captainPic from "../assets/captain.webp";
import placeHolder from "../assets/placeholder.png";

const TeamSearchDetails = ({ selectedTeam }) => {
  const [teamRoster, setTeamRoster] = useState([]);

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (selectedTeam) {
      fetch(`${URL}/api/teams/${selectedTeam.id}/users`)
        .then((res) => res.json())
        .then((data) => setTeamRoster(data));
    }
  }, [selectedTeam]);

  return (
    <div className="bg-secondary/30">
      <div className="grid grid-cols-2 max-md:grid-cols-1">
        <div className="p-8">
          {selectedTeam && (
            <div className="flex flex-col">
              <div className="flex justify-center">
                <h1 className="text-4xl">{selectedTeam.team_name}</h1>
              </div>
              <div className="flex justify-center">
                {/* Replace this with team logo or pic */}
                <img src={placeHolder} alt="" className="w-52" />
              </div>
              <div className="flex justify-center">
                <h1>Captain: </h1>
              </div>
            </div>
          )}
        </div>
        <div className="py-8">
          <table className="table-auto bg-background rounded-lg w-fit">
            <thead className="text-left uppercase">
              <tr>
                <th className="pl-7 py-4">Player</th>
                <th className="pl-7 py-4"> Position</th>
              </tr>
            </thead>
            <tbody>
              {teamRoster &&
                teamRoster.map((player) => (
                  <tr
                    key={player.id}
                    className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100 max-md:flex-row"
                  >
                    <td className="px-6 py-5 text-black/80">
                      <div className="flex items-center m-auto">
                        <img src={player.photo} className="w-16 mr-7" />
                        <div className="mr-7">
                          {player.first_name} {player.last_name}{" "}
                          {player.id === selectedTeam.captain_id && (
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
    </div>
  );
};

export default TeamSearchDetails;
