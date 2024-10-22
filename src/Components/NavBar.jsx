import React, { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../helpers/logout";
import { getUserData } from "../helpers/getUserData";
import { Zap } from "lucide-react";
import "../Styles/nav.css";

const NavBar = ({ userDetails, setUserDetails }) => {
  console.log('Navbar User Details: ', userDetails)
  async function handleLogout() {
    try {
      //call function to log out of firebase, no need to call backend
      await logout();
      toast.success("User logged out successfully!", {
        position: "top-center",
      });
      navigate("/");
      console.log("User logged out successfully!");
      setUserDetails(null);
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });

      console.error("Error logging out:", error.message);
    }
  }
  const [toggleHamburger, setToggleHamburger] = useState(false);

  const { width } = useWindowSize();

  const navigate = useNavigate();

  const LargeNavBar = ({ userDetails }) => (
    <div className="flex justify-between items-center p-5 bg-accent text-text bebas-neue-regular">
      {/* <h1
        className=" font-extrabold text-4xl hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        H2H
      </h1> */}
      <img src="https://res.cloudinary.com/dwygxzqku/image/upload/v1722631715/H2H/h2h-logos/H2H-Logo_jnhf5q.png" className="h-20 rounded hover:cursor-pointer border-white" onClick={() => navigate("/")}/>
      
      {userDetails && (
        <ul className="flex space-x-6 font-bold text-3xl justify-center items-center">
          <Link to="/matches">
            <li className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500">
              Matches
            </li>
          </Link>
          <Link
            to={
              userDetails.user_team_id
                ? `/myTeam/${userDetails.user_team_id}`
                : "/createTeam"
            }
          >
            <li className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500">
              My Team
            </li>
          </Link>
          <Link to="/teamSearch">
            <li className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500">
              Team Search
            </li>
          </Link>
          {/* <Link to="/leaderboard"><li className="nav-li border-b-2 border-transparent hover:border-white duration-500">
            Leaderboard
          </li></Link> */}
          <Link to="/profile">
            <li className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500">
              My Profile
            </li>
          </Link>
          <Link to="/">
            <li
              className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500 p-1"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out mb-1"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </li>
          </Link>
        </ul>
      )}
    </div>
  );

  const SmallNavBar = ({ userDetails }) => (
    <div className="flex justify-between items-center p-6 bg-accent text-text">
      {/* <h1
        className="font-extrabold text-4xl bebas-neue-regular cursor-pointer"
        onClick={() => navigate("/")}
      >
        H2H
      </h1> */}
      <img src="https://res.cloudinary.com/dwygxzqku/image/upload/v1722631715/H2H/h2h-logos/H2H-Logo_jnhf5q.png" className="h-16 rounded hover:cursor-pointer border-white" onClick={() => navigate("/")}/>
      {userDetails && (
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
                {/* <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Matches
                </a> */}
                <Link
                  to="/matches"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/50"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={() => setToggleHamburger(false)}
                >
                  Matches
                </Link>
                <Link
                  to={
                    userDetails.user_team_id
                      ? `/myTeam/${userDetails.user_team_id}`
                      : "/createTeam"
                  }
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/50"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                  onClick={() => setToggleHamburger(false)}
                >
                  My Team
                </Link>
                <Link
                  to="/teamSearch"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/50"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                  onClick={() => setToggleHamburger(false)}
                >
                  Team Search
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/50"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                  onClick={() => setToggleHamburger(false)}
                >
                  My Player
                </Link>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/50"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                  onClick={() => {
                    handleLogout();
                    setToggleHamburger(false);
                  }}
                >
                  <div className="flex space-x-1 justify-start items-center cursor-pointer">
                    <p>Sign Out</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                  </div>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return width >= 630 ? (
    <LargeNavBar userDetails={userDetails} />
  ) : (
    <SmallNavBar userDetails={userDetails} />
  );
};

export default NavBar;
