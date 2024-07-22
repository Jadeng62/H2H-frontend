import React from "react";

const FilteringTeams = ({
  setFilteredTeams,
  userDetails,
  allTeams,
  allTeamsActive,
  setAllTeamsActive,
  joinableTeamsActive,
  setJoinableTeamsActive,
}) => {
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
    <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col md:flex-row md:items-center">
      <div className="flex flex-row items-center justify-center mb-4 md:mb-0 mx-5">
        <span className="font-semibold">Filtering Options: </span>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <button
          className={`text-white text-lg py-2 px-3 ${
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
            className={`text-white text-lg py-2 px-3 ${
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
