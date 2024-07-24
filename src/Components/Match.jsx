import { useEffect, useState } from "react";
import { formattedDate, formattedTime } from "../helpers/helper";
import placeHolder from "../assets/placeholder.png";

import "../Styles/matches.css";

const Match = ({ match }) => {
  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const { team1_id } = match;
    fetch(`${URL}/api/teams/${team1_id}`)
      .then((res) => res.json())
      .then((data) => setTeam1(data));
  }, []);

  useEffect(() => {
    // if (match) {
    const { team2_id } = match;
    fetch(`${URL}/api/teams/${team2_id}`)
      .then((res) => res.json())
      .then((data) => setTeam2(data));
    // }
  }, []);

  return (
    <div className="match-display-container bg-secondary/30 text-text bebas-neue-regular">
      <div className="flex justify-center text-xl">
        <h1 className="text-3xl">{`${team1.team_name} V.S. ${
          Object.hasOwn(team2, "error") ? "TBD" : team2.team_name
        }`}</h1>
      </div>
      <div className="flex justify-between">
        <div className="mr-6">
          <img src={placeHolder} alt="" />
        </div>
        <div>
          <img src={placeHolder} alt="" />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center text-2xl">
          <h3>{match.address}</h3>
        </div>
        <div className="flex justify-center text-2xl">
          <h3>
            {formattedDate(match.start_datetime)}{" "}
            <span className="match-span">
              {formattedTime(match.start_datetime)}
            </span>
          </h3>
        </div>
      </div>

      {/* <div className="match-team-1">
             <h1>{team1.team_name}</h1>
           </div>
            <h2 className="match-vs">VS</h2>
           <div className="match-team-2">
             <h1>{team2.team_name}</h1>
           </div>
           <div className="match-info">
               <h3>{match.address}</h3>
               <h3>{match.city}</h3>
               <h3>{match.state}</h3>
               <h3>{formattedDate(match.start_datetime)} <span className="match-span">{formattedTime(match.start_datetime)}</span></h3>
           </div> */}
    </div>
  );
};

export default Match;
