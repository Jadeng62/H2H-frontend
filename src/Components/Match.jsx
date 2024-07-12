import { useEffect, useState } from "react";

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
       <div className="match-display-container grid gap-4">
         <div>
           <div className="bg-lime-500 p-3 ">{team1.team_name}</div>
            <h2 className="bg-neutral-200 mx-3">VS</h2>
           <div className="bg-yellow-500 p-3">{team2.team_name}</div>
           </div>
       </div>
    )
}

export default Match;