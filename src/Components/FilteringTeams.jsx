// import React from "react";

// const FilteringTeams = ({
//   setFilteredTeams,
//   userDetails,
//   allTeams,
//   allTeamsActive,
//   setAllTeamsActive,
//   joinableTeamsActive,
//   setJoinableTeamsActive,
//   setSearchInput,
// }) => {
//   const viewJoinableTeams = () => {
//     const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;

//     const joinableTeams = allTeams.filter(
//       (team) => team[positionKeyWord] === null
//     );

//     console.log(joinableTeams);
//     setFilteredTeams(joinableTeams);
//     setJoinableTeamsActive(true);
//     setAllTeamsActive(false);
//   };

//   return (
//     <div className="bg-secondary/10 p-5 rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col md:flex-row md:items-center">
//       <div className="flex flex-row items-center justify-center mb-4 md:mb-0 mx-5">
//         <span className="font-semibold">Filter: </span>
//       </div>
//       <div className="flex flex-wrap gap-4 items-center justify-center">
//         <button
//           className={`text-white text-lg py-2 px-3 ${
//             allTeamsActive ? "bg-accent" : "bg-secondary/30"
//           } rounded-lg cursor-pointer`}
//           onClick={() => {
//             setFilteredTeams(allTeams);
//             setAllTeamsActive(true);
//             setJoinableTeamsActive(false);
//             setSearchInput("");
//           }}
//         >
//           All Teams
//         </button>
//         {userDetails && userDetails.user_team_id === null && (
//           <button
//             className={`text-white text-lg py-2 px-3 ${
//               joinableTeamsActive ? "bg-accent" : "bg-secondary/30"
//             } rounded-lg cursor-pointer`}
//             onClick={viewJoinableTeams}
//           >
//             Open Teams
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilteringTeams;

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
        <span className="font-semibold">Filter Teams By Position: </span>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center md:flex-row xl:w-1/2">
        <button
          className={`text-white text-lg py-2 px-3 ${
            allTeamsActive ? "bg-accent border-4 border-accent" : "bg-secondary/30 border-4 border-secondary/10"} rounded-lg cursor-pointer`}          
          onClick={() => {
            setFilteredTeams(allTeams);
            setAllTeamsActive(true);
            setJoinableTeamsActive(false);
            setSearchInput("");
          }}
        >
          All Teams
        </button>
      {userDetails && userDetails.user_team_id === null && (
          <select
            className="text-lg py-4 px-3 rounded-lg bg-secondary/30 border-secondary/10 cursor-pointer"
            value={selectedPosition}
            onChange={handlePositionChange}
          >
            <option value="">Filter Open Teams By Position</option>
            {/* <option value="All">View All Teams</option> */}
            <option value="point_guard">Point Guard</option>
            <option value="shooting_guard">Shooting Guard</option>
            <option value="small_forward">Small Forward</option>
            <option value="power_forward">Power Forward</option>
            <option value="center">Center</option>
          </select>
        )}
      {userDetails && userDetails.user_team_id === null && (
          <button
            className={`text-white text-lg py-2 px-3  ${
              joinableTeamsActive ? "bg-accent border-4 border-accent" : "bg-secondary/30 border-4 border-secondary/10"
            } rounded-lg cursor-pointer`}
            onClick={viewJoinableTeams}
          >
            All Open Teams
          </button>
        )}

      </div>
    </div>
  );
};

export default FilteringTeams;