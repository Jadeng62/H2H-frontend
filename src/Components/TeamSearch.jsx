import React, { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUserData";
import { Search } from "lucide-react";
import placeHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

const TeamSearch = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${URL}/api/teams`);
        const data = await response.json();

        if (userDetails && userDetails.user_team_id === null) {
          setAllTeams(data);
          setFilteredTeams(data);
        } else if (userDetails && userDetails.user_team_id !== null) {
          const teamsExcludingUsersTeam = data.filter(
            (team) => team.id !== userDetails.user_team_id
          );
          setAllTeams(teamsExcludingUsersTeam);
          setFilteredTeams(teamsExcludingUsersTeam);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [userDetails]);

  useEffect(() => {
    const filtered = allTeams.filter((team) =>
      team.team_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchInput, allTeams]);

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUserDetails(user);
      }
    }
    getUser();
  }, []);

  return (
    <div className="text-text bg-secondary/30 max-w-fit p-4">
      <h1 className="text-3xl pb-4">Team Search</h1>
      <div className="flex items-center border-4 border-black rounded-lg bg-accent">
        <div className="flex-grow">
          <input
            type="text"
            className="text-black p-2 rounded-l-md w-full h-12 focus:outline-none"
            onChange={handleChange}
            value={searchInput}
          />
        </div>
        <div className="bg-accent p-2 rounded-r-md h-12 w-12 flex items-center justify-center">
          <Search size={25} />
        </div>
      </div>

      <div>
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div
              className="py-4 border-b-2 flex justify-evenly items-center cursor-pointer"
              key={team.id}
              onClick={() => navigate(`/team/${team.id}`)}
            >
              <p>{team.team_name}</p>
              <img src={placeHolder} className="h-12" alt="team" />
            </div>
          ))
        ) : (
          <div className="py-4 border-b-2">No Teams Found</div>
        )}
      </div>
    </div>
  );
};

export default TeamSearch;
