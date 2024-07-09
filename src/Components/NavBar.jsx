import React, { useState } from "react";
import useWindowSize from "./useWindowSize";
import { useNavigate, Link } from "react-router-dom";

import "../Styles/nav.css"

const NavBar = ({ user }) => {
  const [toggleHamburger, setToggleHamburger] = useState(false);

  const { width } = useWindowSize();

  const navigate = useNavigate();

  const LargeNavBar = ({ user }) => (
    <div className="flex justify-between items-center p-8 bg-accent text-text">
      <h1
        className="nav-h1 font-extrabold text-3xl hover: cursor-pointer"
        onClick={() => navigate("/")}
      >
        H2H
      </h1>
      {user && (
        <ul className="flex space-x-6 font-bold">
       <Link to="/matches"><li className="nav-li border-b-2 border-transparent hover:border-white duration-500">
            Matches
          </li></Link> 
          <li className="nav-li border-b-2 border-transparent hover:border-white duration-500">
            My Team
          </li>
          <li className="nav-li border-b-2 border-transparent hover:border-white duration-500">
            Leaderboard
          </li>
          <li className="nav-li border-b-2 border-transparent hover:border-white duration-500">
            My Player
          </li>
        </ul>
      )}
    </div>
  );

  const SmallNavBar = ({ user }) => (
    <div className="flex justify-between items-center p-8 bg-accent text-text">
      <h1 className="font-bold text-3xl">H2H</h1>
      {user && (
        <div>
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
            onClick={() => setToggleHamburger(!toggleHamburger)}
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          {toggleHamburger && (
            <div
              className="absolute right-0 z-10 mt-2 w-screen origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                {/* Replace a tags with Link to appropriate routes */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Matches
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  My Team
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  Leaderboard
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  My Player
                </a>
                {/* <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    Sign Out
                  </button>
                </form> */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return width >= 535 ? (
    <LargeNavBar user={user} />
  ) : (
    <SmallNavBar user={user} />
  );
};

export default NavBar;
