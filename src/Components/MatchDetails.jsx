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
    <div className="text-text">
      <h1>Match Details: {id}</h1>
      <div className="flex">
        <div>
          {match.id && (
            <div>
              <h1>{match.address}</h1>
              <h1>{match.city}</h1>
              <h1>{match.state}</h1>
              <h1>{match.zip}</h1>
            </div>
          )}
        </div>
        <div>
          {opponentLineup.length > 0 &&
            opponentLineup.map((player) => (
              <div>
                <h1>{player.first_name}</h1>
              </div>
            ))}
        </div>
        <div>
          {teamLineup.length > 0 &&
            teamLineup.map((player) => (
              <div>
                <h1>{player.first_name}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
