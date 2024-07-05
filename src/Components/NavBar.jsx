import React from "react";
import useWindowSize from "./useWindowSize";

const LargeNavBar = ({ user }) => (
  <div className="flex justify-between items-center p-4 bg-blue-400">
    <h1 className="font-bold text-3xl">H2H</h1>
    {user && (
      <ul className="flex space-x-6">
        <li className="border-b-2 border-transparent hover:border-white duration-500">
          Matches
        </li>
        <li className="border-b-2 border-transparent hover:border-white duration-500">
          My Team
        </li>
        <li className="border-b-2 border-transparent hover:border-white duration-500">
          LeaderBoard
        </li>
        <li className="border-b-2 border-transparent hover:border-white duration-500">
          My Player
        </li>
      </ul>
    )}
  </div>
);

const SmallNavBar = ({ user }) => (
  <div className="flex justify-between items-center p-4 bg-purple-400">
    <h1 className="font-bold text-3xl">H2H</h1>
    {user && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
      //   <ul className="flex space-x-6">
      //     <li>Matches</li>
      //     <li>My Team</li>
      //     <li>LeaderBoard</li>
      //     <li>My Player</li>
      //   </ul>
    )}
  </div>
);

const NavBar = ({ user }) => {
  const { width } = useWindowSize();

  return width >= 535 ? (
    <LargeNavBar user={user} />
  ) : (
    <SmallNavBar user={user} />
  );
};

export default NavBar;
