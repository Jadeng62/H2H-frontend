import { useEffect, useState } from "react";

import MatchForm from "../Components/MatchForm";
import Match from "../Components/Match";

import "../Styles/matches.css";
import { useNavigate } from "react-router-dom";

const Matches = ({ userDetails, userTeam }) => {
  const [matchData, setMatchData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL}/api/matches`)
      .then((res) => res.json())
      .then((data) => setMatchData(data));
  }, []);

  const handleCreate = (e) => {
    // setToggle(!toggle);
   navigate("/createMatch")
  };

  return (
    <>
      {toggle && (
        <MatchForm
          toggle={toggle}
          setToggle={setToggle}
          setMatchData={setMatchData}
        />
      )}
      <h1 className="matches-h1 bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
        All Matches
      </h1>
      <div className="matches-container h-screen">
        <div className="matches-utility-container">
          <section className="mathes-utility-section">
            <button className="matches-btn text-white" onClick={handleCreate}>
              Create Match
            </button>
            <select name="borough" id="borough" className="matches-select">
              <option>-- Match Type --</option>
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
          </section>
        </div>
        <div className="matches-games-container text-yellow-50 grid gap-8 p-8">
          {matchData.length > 0 &&
            matchData.map((match) => (
              <div
                key={match.id}
                onClick={() => navigate(`/matches/${match.id}`)}
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
