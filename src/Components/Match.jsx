import { useEffect, useState } from "react";
import { formattedDate, formattedTime } from "../helpers/helper";

import "../Styles/matches.css"

const Match = ({match}) => {
 const [team1, setTeam1] = useState({})
 const [team2, setTeam2] = useState({})


 const URL = import.meta.env.VITE_BASE_URL


 useEffect(() => {
    const { team1_id } = match;
    fetch(`${URL}/api/teams/${team1_id}`)
    .then((res) => res.json()) 
    .then((data) => setTeam1(data))
 }, [match])

 useEffect(() => {
    const { team2_id } = match;
    fetch(`${URL}/api/teams/${team2_id}`)
    .then((res) => res.json()) 
    .then((data) => setTeam2(data))
 }, [match])



    return (
       <div className="match-display-container ">
           <div className="match-team-1">
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
           </div>
       </div>
    )
}

export default Match;