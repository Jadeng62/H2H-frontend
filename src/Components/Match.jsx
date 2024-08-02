import { useEffect, useState } from "react";
import { formattedDate, formattedTime } from "../helpers/helper";
import { Shield } from "lucide-react";
import placeHolder from "../assets/placeholder.png";

import "../Styles/matches.css";

const Match = ({ match }) => {
  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const { team1_id } = match;

    if (team1_id) {
      fetch(`${URL}/api/teams/${team1_id}`)
        .then((res) => res.json())
        .then((data) => setTeam1(data));
    }
  }, []);

  useEffect(() => {
    const { team2_id } = match;
    if (team2_id) {
      fetch(`${URL}/api/teams/${team2_id}`)
        .then((res) => res.json())
        .then((data) => setTeam2(data));
    }
  }, []);

  return (
    <div className="match-display-container bg-secondary/30 text-text bebas-neue-regular">
      <div className="flex justify-center mb-4 text-xl">
        {/* <h1 className="text-3xl">{`${team1.team_name} V.S. ${
          Object.hasOwn(team2, "error") ? "TBD" : team2.team_name
        }`}</h1> */}
        <h1 className="text-3xl">{`${
          team1.team_name ? team1.team_name : "TBD"
        } VS.  ${team2.team_name ? team2.team_name : "TBD"}`}</h1>
      </div>
      <div className="flex justify-between mx-2">
        <div className="mr-6">
          {/* <img src={placeHolder} alt="" /> */}
          {team1.team_pic ? (
              <img
                src={team1.team_pic}
                alt="team_pic"
                className="w-48 rounded-lg thumb"
              />
          ) : (
            <div className="bg-secondary/5 w-48 h-48 flex justify-center items-center rounded border-2 border-secondary/5 px-3">
              <hr className="border-2 border-primary/60 w-1/4" />
                <Shield size={52} className="text-text/60" />
              <hr className="border-2 border-accent/60 w-1/4" />{" "}
            </div>
          )}
        </div>
        <div>
          {/* <img src={placeHolder} alt="" /> */}
          {team2.team_pic ? (
            <img
              src={team2.team_pic}
              alt="team_pic"
              className="w-48 rounded-lg thumb"
            />
          ) : (
            <div className="bg-secondary/5 w-48 h-48 flex justify-center items-center rounded border-2 border-secondary/5 px-3">
              <hr className="border-2 border-primary/60 w-1/4" />
                <Shield size={52} className="text-text/60" />
              <hr className="border-2 border-accent/60 w-1/4" />{" "}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center my-auto">
        <div className="text-center text-2xl bg-secondary/30 rounded-lg py-2 my-4">
          <h3>{match.park_name}</h3>
        </div>
        <div className="flex justify-center text-center text-2xl">
          {/* <h3>{match.address}</h3> */}
        </div>
        <div className="flex justify-center text-2xl bg-accent rounded-lg py-2">
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
