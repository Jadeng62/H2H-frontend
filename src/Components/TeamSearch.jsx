import React, { useEffect, useState } from "react";
import { getUserData } from "../helpers/getUserData";
import { Check, Search } from "lucide-react";
import placeHolder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import TeamSearchDetails from "./TeamSearchDetails";
import FilteringTeams from "./FilteringTeams";
import { CircleX } from "lucide-react";
const TeamSearch = ({ setNavDetails }) => {
  const [allTeams, setAllTeams] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTeam, setSelectedTeam] = useState();
  //
  const [allTeamsActive, setAllTeamsActive] = useState(false);
  const [joinableTeamsActive, setJoinableTeamsActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const rosteredPlayerCount = (team) => {
    let numberOfPlayers = 0;
    if (team.point_guard_id !== null) numberOfPlayers++;
    if (team.shooting_guard_id !== null) numberOfPlayers++;
    if (team.small_forward_id !== null) numberOfPlayers++;
    if (team.power_forward_id !== null) numberOfPlayers++;
    if (team.center_id !== null) numberOfPlayers++;
    return numberOfPlayers;
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
    setAllTeamsActive(false);
    setJoinableTeamsActive(false);
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
      {successMessage && (
        <div className="bg-secondary/30 p-5 mx-8 mt-8 rounded-lg text-white text-lg border-4 border-primary max-sm:mb-1">
          <div className="flex">
            <span className="mr-5">
              <Check size={28} className="text-primary" />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold">Congratulations!</span>
              <span>
                You have successfully joined the team:
                <strong>{` ${selectedTeam.team_name}`}</strong>.
              </span>
            </div>
          </div>
        </div>
      )}
      {/* <h1 className="text-3xl mb-4">Team Search</h1> */}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 ">
          <div className="flex items-center border-4 border-black rounded-lg">
            <div className="flex-grow">
              <input
                type="text"
                className="text-black p-2 rounded-l-md w-full h-12 focus:outline-none hover:bg-text"
                onChange={handleChange}
                value={searchInput}
                placeholder="Enter Team Name..."
              />
            </div>
            <div className="bg-accent border-l-4 border-black p-2 rounded-r-md h-12 w-12 flex items-center justify-center">
              <Search size={30} />
            </div>
          </div>
          <div className="my-7">
            <FilteringTeams
              setFilteredTeams={setFilteredTeams}
              userDetails={userDetails}
              allTeams={allTeams}
              allTeamsActive={allTeamsActive}
              setAllTeamsActive={setAllTeamsActive}
              joinableTeamsActive={joinableTeamsActive}
              setJoinableTeamsActive={setJoinableTeamsActive}
            />
          </div>
          <div className="overflow-y-scroll space-y-2  lg:h-144 mt-7 ">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <div
                  className="py-4 grid grid-cols-3 bg-secondary/30 items-center cursor-pointer bebas-neue-regular text-text hover:bg-secondary/50 rounded"
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                >
                  <div className="flex justify-center">
                    <p className="text-3xl">{team.team_name}</p>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={placeHolder}
                      className="h-12 rounded"
                      alt="team"
                    />
                  </div>
                  <div className="flex justify-center items-center text-2xl">
                    <span className="text-primary">
                      {rosteredPlayerCount(team)}
                    </span>
                    <span className="mx-1">/</span>
                    <span className="text-accent">5</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 max-sm:mb-7">
                <div className="flex">
                  <span className="mr-5">
                    <CircleX size={28} className="text-red-500" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">No Teams Found</span>
                    <span>
                      Don't worry! Try adjusting your search criteria to find
                      the teams you're looking for.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-8">
          <TeamSearchDetails
            selectedTeam={selectedTeam}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            allTeams={allTeams}
            setSelectedTeam={setSelectedTeam}
            setSuccessMessage={setSuccessMessage}
            setNavDetails={setNavDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamSearch;
