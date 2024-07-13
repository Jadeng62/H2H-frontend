import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MatchDetails = ({ upcomingGames, userTeam }) => {
  const [match, setMatch] = useState({});
  const { id } = useParams();
  const [teamLineup, setTeamLineup] = useState([]);
  const [opponentLineup, setOpponentLineup] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState({});

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const foundMatch = upcomingGames.find((game) => game.id === +id);
    if (foundMatch) {
      setMatch(foundMatch);
    }
  }, [upcomingGames, id]);

  useEffect(() => {
    if (userTeam && match.id) {
      fetch(`${URL}/api/teams/${userTeam.id}/users`)
        .then((res) => res.json())
        .then((data) => setTeamLineup(data))
        .catch((error) => console.error("Error fetching team lineup:", error));

      const opponentTeamId =
        userTeam.id === match.team1_id ? match.team2_id : match.team1_id;
      fetch(`${URL}/api/teams/${opponentTeamId}/users`)
        .then((res) => res.json())
        .then((data) => setOpponentLineup(data))
        .catch((error) =>
          console.error("Error fetching opponent lineup:", error)
        );

      fetch(`${URL}/api/teams/${opponentTeamId}`)
        .then((res) => res.json())
        .then((data) => setOpponentTeam(data));
    }
  }, [userTeam, match.id]);

  // useEffect(() => {
  //   fetch(`${URL}/api/teams/`);
  // });

  return (
    <div className="text-text h-fit">
      <div className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        <div className="flex justify-evenly">
          <h1>{userTeam.team_name}</h1>
          <h1>V.S. </h1>
          <h1>{opponentTeam.team_name}</h1>
        </div>
      </div>
      <div className="grid grid-cols-6 p-8">
        <div className="col-span-2 w-fit">
          <div className="border-2 flex-row flex-1 p-4 overflow-y-auto">
            {match.id && (
              <div>
                <h1>{match.address}</h1>
                <h1>{match.city}</h1>
                <h1>{match.state}</h1>
                <h1>{match.zip}</h1>
                <h1>{match.start_datetime}</h1>
              </div>
            )}
          </div>
          <div className="border-2 flex-1 p-4 overflow-y-auto">
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
                {opponentLineup &&
                  opponentLineup.map((player) => {
                    return (
                      <tr
                        key={player.id}
                        className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100"
                      >
                        <td className="px-6 py-5 text-black/80">
                          {player.first_name} {player.last_name}
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
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="border-2 flex-1 p-4 overflow-y-auto">
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
                {teamLineup &&
                  teamLineup.map((player) => {
                    return (
                      <tr
                        key={player.id}
                        className="bg-white border-b font-medium text-gray-600/60 hover:bg-gray-100"
                      >
                        <td className="px-6 py-5 text-black/80">
                          {player.first_name} {player.last_name}
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
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
