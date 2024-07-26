import { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUserData";
import MatchForm from "../Components/MatchForm";
import Match from "../Components/Match";
import "../Styles/matches.css";
import "../Styles/teamForm.css";
import { useNavigate } from "react-router-dom";
import { isTeamFull } from "../helpers/helper";

const Matches = ({ matchData, setMatchData, userTeam }) => {
  const [toggle, setToggle] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserData();
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, []);

  const handleCreate = (e) => {
    navigate("/createMatch");
  };

  return (
    <>
      {toggle && <MatchForm toggle={toggle} setToggle={setToggle} />}
      <h1 className="matches-h1 bg-secondary/30  text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        All Matches
      </h1>
      <div
        // className="matches-container "
        className=" my-10 mx-10"
      >
        <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 mb-10">
          <div className="flex gap-1 sm:gap-4 items-center md:flex-row text-nowrap">
            <div>
              <h1 className="text-xl font-bold hidden sm:block">
                Match Options:{" "}
              </h1>
            </div>
            <div>
              {userDetails &&
                userTeam &&
                userDetails.id === userTeam.captain_id &&
                userDetails.user_team_id !== null &&
                isTeamFull(userTeam) && (
                  <button
                    // className="matches-btn p-2 text-white"
                    className="p-2 bg-accent rounded-lg  hover:text-white hover:bg-black hover:border-white border-2 border-accent"
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
                // className="matches-select p-2"
                className="p-3 rounded-lg bg-secondary/50 text-white hover:bg-secondary/70"
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
        <div className="grid gap-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
