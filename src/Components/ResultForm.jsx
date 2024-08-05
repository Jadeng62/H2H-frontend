import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/ResultForm.css";
import { getMatchDataByMatchID, getTeamByTeamID, getTeamPlayersByTeamID, getUserData } from "../helpers/helper";

const URL = import.meta.env.VITE_BASE_URL;

const ResultForm = () => {
    const { id } = useParams();
    const [resultForm, setResultForm] = useState({
        match_id: id,
        winner: "",
        loser: "",
        MVP: ""
    });
    const [userTeamData, setUserTeamData] = useState({});
    const [opposingTeamData, setOpposingTeamData] = useState({});
    const [teammates, setTeammates] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        async function getUser() {
            const user = await getUserData();
            if (user) {
                setUserDetails(user);
            }
        }

        getUser();
    }, []);

    useEffect(() => {
        if (userDetails.id) {
            getMatchDataByMatchID(id)
                .then((matchData) => {
                    const { user_team_id } = userDetails;
                    const { team1_id, team2_id } = matchData;
                    const opposingTeamID = user_team_id === team1_id ? team2_id : team1_id;

                    getTeamPlayersByTeamID(user_team_id)
                        .then((players) => {
                            const teammates = players.filter((player) => player.id !== userDetails.id);
                            setTeammates(teammates);
                        });

                    getTeamByTeamID(user_team_id)
                        .then((teamData) => setUserTeamData(teamData));

                    getTeamByTeamID(opposingTeamID)
                        .then((teamData) => setOpposingTeamData(teamData));
                });
        }
    }, [userDetails, id]);

    useEffect(() => {
        fetch(`${URL}/api/matches/${id}/results`)
            .then((res) => res.json())
            .then((data) => {
                setResultForm(data);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResultForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${URL}/api/matches/${id}/results`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resultForm)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Result created:", data);
                // Handle success, maybe redirect or show a success message
            })
            .catch((err) => console.error("Error creating result:", err));
    };

    return (
        <div>
            <h2>Submit Match Result</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="winner">Winner</label>
                    <select
                        id="winner"
                        name="winner"
                        value={resultForm.winner}
                        onChange={handleChange}
                    >
                        <option value="">Select Winner</option>
                        <option value={userTeamData.id} disabled={resultForm.loser === userTeamData.id}>{userTeamData.team_name}</option>
                        <option value={opposingTeamData.id} disabled={resultForm.loser === opposingTeamData.id}>{opposingTeamData.team_name}</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="loser">Loser</label>
                    <select
                        id="loser"
                        name="loser"
                        value={resultForm.loser}
                        onChange={handleChange}
                    >
                        <option value="">Select Loser</option>
                        <option value={userTeamData.id} disabled={resultForm.winner === userTeamData.id}>{userTeamData.team_name}</option>
                        <option value={opposingTeamData.id} disabled={resultForm.winner === opposingTeamData.id}>{opposingTeamData.team_name}</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="MVP">MVP</label>
                    <select
                        id="MVP"
                        name="MVP"
                        value={resultForm.MVP}
                        onChange={handleChange}
                    >
                        <option value="">Select MVP</option>
                        {teammates.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.first_name} {user.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit Result</button>
            </form>
        </div>
    );
};

export default ResultForm;
