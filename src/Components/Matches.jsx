import { useEffect, useState } from "react";

import MatchForm from "../Components/MatchForm";
import Match from "../Components/Match";

import "../Styles/matches.css";
import { useNavigate } from "react-router-dom";
import { isTeamFull } from "../helpers/helper";

const Matches = ({ matchData, setMatchData}) => {
  const [toggle, setToggle] = useState(false);

  const URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const handleCreate = (e) => {
   navigate("/createMatch")
  };

  return (
    <>
      {toggle && (
        <MatchForm
          toggle={toggle}
          setToggle={setToggle}
          />
      )}
      <h1 className="matches-h1 bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
        All Matches
      </h1>
      <div className="matches-container">
        <div className="bg-secondary/10 p-5 w-fit rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col md:flex-row md:items-center mb-12">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div>
              <h1 className="text-xl font-bold">Match Options: </h1>
            </div>
            <div>
              {userDetails &&
                userTeam &&
                userDetails.id === userTeam.captain_id &&
                userDetails.user_team_id !== null &&
                isTeamFull(userTeam) && (
                  <button
                    className="matches-btn p-2 text-white"
                    onClick={handleCreate}
                  >
                    Create Match
                  </button>
                )}
            </div>
            <div className="">
              <select
                name="borough"
                id="borough"
                className="matches-select p-2"
              >
                <option>Match Type</option>
                <option value="all-games" className="matches-option">
                  All Games
                </option>
                <option value="open" className="matches-option">
                  Open
                </option>
                <option value="locked" className="matches-option">
                  Locked
                </option>
                <option value="today" className="matches-option">
                  Today
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-12 flex-wrap max-md:justify-center">
          {matchData.length > 0 &&
            matchData.map((match) => (
              <div
                key={match.id}
                onClick={() => navigate(`/matches/${match.id}`)}
                className="flex justify-center"
              >
                <Match match={match} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Matches;
