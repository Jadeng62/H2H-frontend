import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { auth } from "./helpers/firebase";

import Login from "./Components/Login";
import SignUp from "./Components/Register";
import Profile from "./Components/Profile";
import Test from "./Components/Test";
import LandingPage from "./Components/LandingPage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Matches from "./Components/Matches";
import MyTeam from "./Components/MyTeam";
import Leaderboard from "./Components/Leaderboard";
import { getUserData } from "./helpers/getUserData";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MyTeamForm from "./Components/MyTeamForm";
import MatchDetails from "./Components/MatchDetails";
import TeamSearch from "./Components/TeamSearch";
import TeamByID from "./Components/TeamByID";
import BBallCourt from "./Components/BBallCourt";
import MatchForm from "./Components/MatchForm";
import NotFound from "./Components/NotFound";

function App() {
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState(null);

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUserDetails(user);
      }
    }

    getUser();
  }, [user]);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar userDetails={userDetails} setUserDetails={setUserDetails} />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" /> : <LandingPage />}
          />
          <Route path="/test" element={user ? <Test /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/createMatch" element={<MatchForm />} />
          <Route path="/matches/:id" element={<MatchDetails />} />
          {/* to view other teams - future feature */}
          <Route path="/team/:id" element={<TeamByID />} />
          <Route path="/myTeam/:id" element={<MyTeam />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* bball route for development only: */}
          <Route path="/bballCourts" element={<BBallCourt />} />
          <Route
            path="/createTeam"
            element={
              userDetails && <MyTeamForm setNavDetails={setUserDetails} />
            }
          />
          <Route
            path="/teamSearch"
            element={
              userDetails && <TeamSearch setNavDetails={setUserDetails} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
