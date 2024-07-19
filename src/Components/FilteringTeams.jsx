import React, { useState } from "react";

const FilteringTeams = ({
  setFilteredTeams,
  userDetails,
  allTeams,
  allTeamsActive,
  setAllTeamsActive,
  joinableTeamsActive,
  setJoinableTeamsActive,
}) => {
  // const [allTeamsActive, setAllTeamsActive] = useState(false);
  // const [joinableTeamsActive, setJoinableTeamsActive] = useState(false);

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

  return (
    <div className="flex items-center bg-secondary/30 py-10 px-6 rounded-lg">
      <h1 className="text-2xl mr-8">Filtering Options:</h1>
      <div className="flex gap-8">
        <button
          className={`text-white text-xl py-2 px-3 ${
            allTeamsActive ? "bg-accent" : "bg-secondary/30"
          } rounded-lg cursor-pointer`}
          onClick={() => {
            setFilteredTeams(allTeams);
            setAllTeamsActive(true);
            setJoinableTeamsActive(false);
          }}
        >
          All Teams
        </button>
        {userDetails && userDetails.user_team_id === null && (
          <button
            className={`text-white text-xl py-2 px-3 ${
              joinableTeamsActive ? "bg-accent" : "bg-secondary/30"
            } rounded-lg cursor-pointer`}
            onClick={viewJoinableTeams}
          >
            Joinable Teams
          </button>
        )}
      </div>
    </div>
  );
};

export default FilteringTeams;
