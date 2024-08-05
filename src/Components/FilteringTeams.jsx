import React, { useState } from 'react';

const FilteringTeams = ({
  setFilteredTeams,
  userDetails,
  allTeams,
  allTeamsActive,
  setAllTeamsActive,
  joinableTeamsActive,
  setJoinableTeamsActive,
  setSearchInput,
}) => {
  const [selectedPosition, setSelectedPosition] = useState('');

  const viewJoinableTeams = () => {
    const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;
    const joinableTeams = allTeams.filter(
      (team) => team[positionKeyWord] === null
    );

    console.log(joinableTeams);
    setFilteredTeams(joinableTeams);
    setJoinableTeamsActive(true);
    setAllTeamsActive(false);
  };

  const viewUserTeams = () => {
    if (userDetails.user_team_id === null) return;

    const userTeams = allTeams.filter(
      (team) => team.id === userDetails.user_team_id
    );

    console.log(userTeams);
    setFilteredTeams(userTeams);
    setJoinableTeamsActive(false);
    setAllTeamsActive(false);
  };

  const handlePositionChange = (event) => {
    const position = event.target.value;
    setSelectedPosition(position);

    if (position === 'All') {
      setFilteredTeams(allTeams);
      setAllTeamsActive(true);
      setJoinableTeamsActive(false);
    } else {
      const positionKeyWord = `${position.replace(" ", "_")}_id`;
      const filteredTeams = allTeams.filter(
        (team) => team[positionKeyWord] === null
      );
      setFilteredTeams(filteredTeams);
      setAllTeamsActive(false);
      setJoinableTeamsActive(true);
    }
  };

  return (
    <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col md:flex-row md:items-center">
      <div className="flex flex-row items-center justify-center mb-4 md:mb-0 mx-5">
        <span className="font-semibold">Filter: </span>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center md:flex-row">
        <button
          className={`text-white text-lg py-3 px-3 ${
            allTeamsActive ? "bg-accent border-accent" : "bg-secondary/30 border border-secondary/10"
            } rounded-lg cursor-pointer`}          
          onClick={() => {
            setFilteredTeams(allTeams);
            setAllTeamsActive(true);
            setJoinableTeamsActive(false);
            setSearchInput("");
          }}
        >
          All Teams
        </button>
        {userDetails && (
          <button
            className={`text-white text-lg py-3 px-3 ${
              !allTeamsActive && !joinableTeamsActive ? "bg-accent border-accent" : "bg-secondary/30 border border-secondary/10"
            } rounded-lg cursor-pointer`}
            onClick={viewUserTeams}
          >
            My Team
          </button>
        )}
        {userDetails && userDetails.user_team_id === null && (
          <>
            <button
              className={`text-white text-lg py-3 px-3 ${
                joinableTeamsActive ? "bg-accent border-accent" : "bg-secondary/30 border border-secondary/10"
              } rounded-lg cursor-pointer`}
              onClick={viewJoinableTeams}
            >
              Open Teams
            </button>
            <select
              className="text-lg py-4 px-3 rounded-lg bg-secondary/30 border-secondary/10 cursor-pointer flex items-center"
              value={selectedPosition}
              onChange={handlePositionChange}
            >
              <option value="">Open Teams By Position</option>
              <option value="point_guard">Point Guard</option>
              <option value="shooting_guard">Shooting Guard</option>
              <option value="small_forward">Small Forward</option>
              <option value="power_forward">Power Forward</option>
              <option value="center">Center</option>
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default FilteringTeams;
