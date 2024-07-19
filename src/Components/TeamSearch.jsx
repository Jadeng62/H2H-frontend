import React, { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUserData";
import { Search } from "lucide-react";
import placeHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import TeamSearchDetails from "./TeamSearchDetails";

const TeamSearch = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTeam, setSelectedTeam] = useState();

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
    <div className="text-text w-full">
      <div className="bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">
        <h2>Team Search</h2>
      </div>
      {/* <h1 className="text-3xl mb-4">Team Search</h1> */}

      <div className="grid grid-cols-2 max-sm:grid-cols-1">
        <div className="p-8">
          <div className="flex items-center border-4 border-black rounded-lg bg-accent">
            <div className="flex-grow">
              <input
                type="text"
                className="text-black p-2 rounded-l-md w-full h-12 focus:outline-none"
                onChange={handleChange}
                value={searchInput}
              />
            </div>
            <div className="bg-accent border-l-4 border-black p-2 rounded-r-md h-12 w-12 flex items-center justify-center">
              <Search size={30} />
            </div>
          </div>
          <div className="overflow-y-scroll">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <div
                  className="py-4 border-b-2 flex justify-evenly bg-secondary/30 items-center cursor-pointer hover:bg-secondary/50"
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
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
        <div className="p-8">
          <TeamSearchDetails
            selectedTeam={selectedTeam}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamSearch;
