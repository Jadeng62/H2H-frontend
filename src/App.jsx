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

function App() {
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const [userTeam, setUserTeam] = useState("");

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUserDetails(user);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    if (userDetails) {
      fetch(`${URL}/api/teams/${userDetails.user_team_id}`)
        .then((res) => res.json())
        .then((data) => setUserTeam(data))
        .catch((error) => console.error("Error fetching team data:", error));
    }
  }, [userDetails]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar user={user} />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" /> : <LandingPage />}
          />
          <Route path="/test" element={user ? <Test /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile userDetails={userDetails} userTeam={userTeam} />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/matches" element={<Matches />} />
          <Route
            path="/myTeam"
            element={<MyTeam userDetails={userDetails} user={user} />}
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/createTeam" element={<MyTeamForm />} />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
