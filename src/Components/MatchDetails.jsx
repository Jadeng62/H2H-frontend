import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MatchDetails = ({ upcomingGames, userTeam }) => {
  const [match, setMatch] = useState({});
  const { id } = useParams();
  const [teamLineup, setTeamLineup] = useState([]);
  const [opponentLineup, setOpponentLineup] = useState([]);

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
    }
  }, [userTeam, match.id]);

  return (
    <div className="text-text h-fit">
      <div className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        <h1>Match Details</h1>
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
            {opponentLineup.length > 0 &&
              opponentLineup.map((player) => (
                <div key={player.id}>
                  <h1>{player.first_name}</h1>
                </div>
              ))}
          </div>
          <div className="border-2 flex-1 p-4 overflow-y-auto">
            {teamLineup.length > 0 &&
              teamLineup.map((player) => (
                <div key={player.id}>
                  <h1>{player.first_name}</h1>
                </div>
              ))}
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
