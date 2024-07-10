import React, { useEffect, useState } from "react";
import playersData from "../DummyData/myTeam.json";
import { X } from "lucide-react";
const MyTeam = () => {
  //   console.log(playersData.players);

  const [playersInTeam, setPlayersInTeam] = useState(null);
  //might need useState for captain so that we can compare captain ID with the current user/ team player
  const [isUserTeamCaptain, setIsUserTeamCaptain] = useState(false);

  const handleDelete = (playerID) => {
    console.log("Clicked delete for playerID:", playerID);
  };

  useEffect(() => {
    setPlayersInTeam(playersData.players);
  }, []);

  const handleWL = (w, l) => {
    const wLRatio = w / l;
      const flooredRatio = Math.floor(wLRatio * 10) / 10;
      return flooredRatio;
  }



  console.log("playersInTeam-->", playersInTeam);
  return (
    <div className="min-h-screen">
      <h1 className="bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
        My Team
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className=" flex justify-center">

        </div>
        <div className=" flex justify-center">
          <div>
            <h2 className="text-white text-4xl bebas-neue-regular ml-10 mt-5">
              Roster
            </h2>{" "}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
