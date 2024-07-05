import React from "react";

const NavBar = ({ user }) => {
  console.log("This is my user, ", user);
  return (
    <div className="flex justify-between items-center m-2">
      <h1>H2H</h1>
      {user && (
        <ul className="flex space-x-4">
          <li>Matches</li>
          <li>My Team</li>
          <li>LeaderBoard</li>
          <li>My Player</li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
