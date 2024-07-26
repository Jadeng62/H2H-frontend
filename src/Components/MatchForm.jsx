import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData } from "../helpers/getUserData";

import "../Styles/matchForm.css";

const MatchForm = ({ setMatchData }) => {
  const [user, setUser] = useState(null);
  const [parkSearch, setParkSearch] = useState("");
  const [parkResults, setParkResults] = useState([]);
  const [parkData, setParkData] = useState([]);
  const [formData, setFormData] = useState({
    creator_id: "",
    team1_id: "",
    team2_id: "",
    park_name: "",
    address: "",
    borough: "",
    date: "",
    time: "",
    start_datetime: "",
  });

  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const user = await getUserData();
      if (user) {
        setUser(user);
        setFormData((prevFormData) => ({
          ...prevFormData,
          creator_id: user.id,
          team1_id: user.user_team_id,
        }));
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    fetch(`${URL}/api/bball`)
      .then((res) => res.json())
      .then((data) => setParkData(data))
      .catch((err) => console.error("Error with fetch:", err));
  }, [URL]);

  const boroughIdentifier = {
    B: "Brooklyn",
    M: "Manhattan",
    Q: "Queens",
    X: "Bronx",
    R: "Staten Island",
  };

  const handlePropID = (Prop_ID) => {
    const firstLetter = Prop_ID[0];

    if (boroughIdentifier[firstLetter]) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        borough: boroughIdentifier[firstLetter],
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleParkSearch = (e) => {
    const value = e.target.value;
    setParkSearch(value);

    const filteredParks = parkData.filter(
      (park) =>
        park.Name && park.Name.toLowerCase().startsWith(value.toLowerCase())
    );
    setParkResults(filteredParks);
  };

  const handleParkSelect = (park) => {
    setParkSearch(park.Name);
    setFormData({ ...formData, park_name: park.Name, address: park.Location });
    setParkResults([]);
    handlePropID(park.Prop_ID);
    console.log("This is the park", park);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No USER DATA");
      return;
    }

    if (!formData.date || !formData.time) {
      console.error("No time provided");
      return;
    }

    const dateTimeStr = `${formData.date}T${formData.time}:00Z`;
    const dateTime = new Date(dateTimeStr);

    const formattedData = {
      creator_id: user.id,
      team1_id: user.user_team_id,
      team2_id: null,
      park_name: formData.park_name,
      address: formData.address,
      borough: formData.borough,
      start_datetime: dateTime.toISOString(),
      match_completed: false,
      match_winner: null,
      match_loser: null,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(formattedData),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${URL}/api/matches`, options)
      .then((res) => res.json())
      .then((data) => {
        setMatchData(data);
        navigate("/matches");
        toast.success("Created Match successfully!", {
          position: "top-center",
        });
      })
      .catch((err) => console.error("Error with submit", err));
  };

  const handleCancel = (e) => {
    setFormData({
      creator_id: user ? user.id : "",
      team1_id: user ? user.user_team_id : "",
      park_name: "",
      address: "",
      borough: "",
      date: "",
      start_datetime: "",
    });
    navigate("/matches");
  };

  return (
    <>
      <h1 className="matches-h1 bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
        Create a Match
      </h1>
      <div className="match-form-container">
        <form>
          <h1 className="match-form-h1">Enter match information below</h1>
          <div className="match-form-park-container">
            <label htmlFor="park" />
            Search for a Park{" "}
            <input
              id="park_name"
              value={parkSearch || ""}
              onChange={handleParkSearch}
              className="match-form-input"
            />
            <div className="match-form-parks">
              {parkSearch &&
                parkResults.length > 0 &&
                parkResults.map((park, index) => (
                  <li
                    key={index}
                    onClick={() => handleParkSelect(park)}
                    className="match-form-park-result"
                  >
                    {park.Name}
                  </li>
                ))}
            </div>
          </div>
          <label htmlFor="address" />
          Park Location{" "}
          <input
            id="address"
            value={formData.address || ""}
            readOnly
            placeholder="This Field will be filled in for you"
            onChange={handleChange}
            className="match-form-input"
          />
          <label htmlFor="borough" />
          Borough{" "}
          <input
            id="address"
            value={formData.borough || ""}
            readOnly
            placeholder="This Field will be filled in for you"
            onChange={handleChange}
            className="match-form-input"
          />
          <label htmlFor="date" />
          Enter Match Date{" "}
          <input
            id="date"
            value={formData.date}
            type="date"
            required
            onChange={handleChange}
            className="match-form-input"
          />
          <label htmlFor="time" />
          Enter Time of Match{" "}
          <input
            id="time"
            value={formData.time}
            type="time"
            onChange={handleChange}
            className="match-form-input"
          />
        </form>
        <div className="match-form-btn-container">
          <button onClick={handleSubmit} className="match-form-btn">
            Submit
          </button>
          <button onClick={handleCancel} className="match-form-btn danger">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MatchForm;
