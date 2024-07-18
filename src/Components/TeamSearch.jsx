import React, { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUserData";
import { Search } from "lucide-react";

const TeamSearch = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    fetch(`${URL}/api/teams`)
      .then((res) => res.json())
      .then((data) => {
        setAllTeams(data);
        setFilteredTeams(data);
      });
  }, []);

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
    <div className="text-text">
      <h1 className="">Team Search</h1>
      <div className="flex">
        <div>
          <input
            type="text"
            className="text-black p-1"
            onChange={handleChange}
            value={searchInput}
          />
        </div>
        <div className="bg-accent">
          <Search size={26} className="" />
        </div>
      </div>

      <div>
        {filteredTeams.length > 0
          ? filteredTeams.map((team) => (
              <div key={team.id}>{team.team_name}</div>
            ))
          : "No Teams Found"}
      </div>
    </div>
  );
};

export default TeamSearch;
