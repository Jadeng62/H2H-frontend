import React, { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../helpers/logout";
import { getUserData } from "../helpers/getUserData";
import { Zap } from "lucide-react";
import "../Styles/nav.css";

const NavBar = ({userDetails, setUserDetails}) => {

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
      setUserDetails(null)
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
      <h1
        className="nav-h1 font-extrabold text-4xl hover: cursor-pointer"
        onClick={() => navigate("/")}
      >
        H2H
        {/* <span className="flex flex-row">
          H <Zap className="mt-1" /> H
        </span> */}
      </h1>
      {userDetails && (
        <ul className="flex space-x-6 font-bold text-3xl justify-center items-center">
          <Link to="/matches">
            <li className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500">
              Matches
            </li>
          </Link>
          <Link to={userDetails.user_team_id ? `/myTeam/${userDetails.user_team_id}` : "/createTeam"}>
            <li className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500">
              My Team
            </li>
          </Link>
          {/* <Link to="/leaderboard"><li className="nav-li border-b-2 border-transparent hover:border-white duration-500">
            Leaderboard
          </li></Link> */}
          <Link to="/profile">
            <li className="nav-li border-b-2 border-transparent hover:text-black hover:border-white duration-500">
              My Player
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
    <div className="flex justify-between items-center p-8 bg-accent text-text">
      <h1 className="font-bold text-3xl" onClick={() => navigate("/")}>
        H2H
      </h1>
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
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={() => setToggleHamburger(false)}
                >
                  Matches
                </Link>
                <Link
                  to={userDetails.user_team_id ? `/myTeam/${userDetails.user_team_id}` : "/createTeam"}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                  onClick={() => setToggleHamburger(false)}
                >
                  My Team
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                  onClick={() => setToggleHamburger(false)}
                >
                  My Player
                </Link>
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                  onClick={() => {
                    handleLogout();
                    setToggleHamburger(false);
                  }}
                >
                  <div className="flex space-x-1 justify-center items-center">
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
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return width >= 535 ? (
    <LargeNavBar userDetails={userDetails} />
  ) : (
    <SmallNavBar userDetails={userDetails} />
  );
};

export default NavBar;
