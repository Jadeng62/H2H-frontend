import { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUserData";
import MatchForm from "../Components/MatchForm";
import Match from "../Components/Match";
import "../Styles/matches.css";
import "../Styles/teamForm.css";
import { useNavigate } from "react-router-dom";
import { formattedDate, isTeamFull } from "../helpers/helper";
import { CircleX, CircleAlert } from "lucide-react";

const Matches = () => {
  const [toggle, setToggle] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [filteredMatchData, setFilteredMatchData] = useState([]);
  const [userTeam, setUserTeam] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setFilterValue(e.target.value);
  };

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

  useEffect(() => {
    fetch(`${URL}/api/matches`)
      .then((res) => res.json())
      .then((data) => {
        setMatchData(data);
        setFilteredMatchData(data);
      });
  }, []);

  const handleCreate = (e) => {
    navigate("/createMatch");
  };

  useEffect(() => {
    if (userDetails && userDetails.user_team_id) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => setUserTeam(data))
        .catch((error) => console.error("Error fetching team data:", error));
    }
  }, [userDetails]);

  useEffect(() => {
    if (filterValue && filterValue === "open") {
      const openGames = matchData.filter(
        (match) => match.team1_id === null || match.team2_id === null
      );
      setFilteredMatchData(openGames);
    } else if (filterValue && filterValue === "full-matches") {
      const fullMatches = matchData.filter(
        (match) => match.team1_id !== null && match.team2_id !== null
      );
      setFilteredMatchData(fullMatches);
    } else if (filterValue && filterValue === "today") {
      const date = new Date();
      const todaysDate = formattedDate(date);

      const todaysMatches = matchData.filter(
        (match) => formattedDate(match.start_datetime) === todaysDate
      );
      setFilteredMatchData(todaysMatches);
    } else if (filterValue === "all-matches") {
      setFilteredMatchData(matchData);
    }
  }, [filterValue, matchData]);

  return (
    <>
      {toggle && <MatchForm toggle={toggle} setToggle={setToggle} />}
      <h1 className="matches-h1 bg-secondary/30  text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        All Matches
      </h1>
      <div className=" my-10 mx-10">
        {/* User exists and is part of a team, and is a captain, but team not full */}
        {userDetails &&
          userTeam &&
          userDetails.id === userTeam.captain_id &&
          !isTeamFull(userTeam) && (
            <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 my-10">
              <div className="flex text-text">
                <span className="mr-5">
                  <CircleAlert size={28} className="text-yellow-500" />
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold">Incomplete Team</span>
                  <span>
                    Your team needs to be complete before you can create a
                    match.
                  </span>
                </div>
              </div>
            </div>
          )}
        {userDetails &&
          userTeam &&
          isTeamFull(userTeam) &&
          userDetails.id !== userTeam.captain_id && (
            <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 my-10">
              <div className="flex text-text">
                <span className="mr-5">
                  <CircleAlert size={28} className="text-yellow-500" />
                </span>
                <div className="flex flex-col">
                  <span className="font-semibold">Captain Required</span>
                  <span>
                    Your team is ready, but only the captain can create a match.
                  </span>
                </div>
              </div>
            </div>
          )}
        {/* User Is a free agent */}
        {userDetails && !userTeam && (
          <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 my-10">
            <div className="flex text-text">
              <span className="mr-5">
                <CircleAlert size={28} className="text-yellow-500" />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold">Match Creation</span>
                <span>
                  {/* You need to form and captain a complete team in order to
                  create a match. */}
                  You need to be a captain in order to create a match.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 mb-10 mx-10">
        {/* <div className="flex gap-1 sm:gap-4 items-center md:flex-row text-nowrap"> */}
        <div className="flex flex-row gap-4 font-bold max-md:flex-col">
          <div className="flex items-center max-md:flex max-md:justify-center">
            <h1 className="text-xl">Match Options:</h1>
          </div>
          <div className="max-md:flex max-md:justify-center">
            {userDetails &&
              userTeam &&
              userDetails.id === userTeam.captain_id &&
              userDetails.user_team_id !== null &&
              isTeamFull(userTeam) && (
                <button
                  // className="matches-btn p-2 text-white"
                  className="p-2 bg-accent rounded-lg  hover:text-white hover:bg-black hover:border-white border-2 border-accent max-md:w-full"
                  onClick={handleCreate}
                >
                  Create Match
                </button>
              )}
          </div>
          <div className="max-md:flex max-md:justify-center">
            <select
              name="match-options"
              id="match-options"
              className="py-3 rounded-lg bg-secondary/50 text-center text-white hover:bg-secondary/70 max-md:w-full"
              onChange={handleSelectChange}
            >
              {/* <option>Match Type</option> */}
              <option value="all-matches" className="bg-black">
                All Matches
              </option>
              <option value="open" className="">
                Open Matches
              </option>
              <option value="full-matches" className="">
                Full Matches
              </option>
              <option value="today" className="">
                Today's Matches
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid gap-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredMatchData.length > 0 &&
          filteredMatchData.map((match) => (
            <div
              key={match.id}
              onClick={() => navigate(`/matches/${match.id}`)}
              className="flex justify-center hover:cursor-pointer h-fit"
            >
              <Match match={match} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Matches;
