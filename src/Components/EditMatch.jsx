import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../helpers/getUserData";
import "../Styles/matchForm.css";

const EditMatch = ({ setMatchData }) => {
  const { id } = useParams(); // Fetching the match ID from the URL
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    creator_id: "",
    team1_id: "",
    team2_id: "",
    park_name: "",
    address: "",
    borough: "",
    date: "",
    time: "",
    start_datetime: ""
  });
  const [parkSearch, setParkSearch] = useState("");
  const [parkResults, setParkResults] = useState([]);
  const [parkData, setParkData] = useState([]);

  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // Fetch user and initial data on component mount
  useEffect(() => {
    async function fetchData() {
      const user = await getUserData();
      if (user) {
        setUser(user);
        // Fetch existing match data and populate form
        fetchMatchData(id);
      }
    }
    fetchData();
  }, [id]);

  // Function to fetch existing match data
  const fetchMatchData = async (matchId) => {
    try {
      const response = await fetch(`${URL}/api/matches/${matchId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match data");
      }
      const matchData = await response.json();
      setFormData({
        creator_id: matchData.creator_id,
        team1_id: matchData.team1_id,
        team2_id: matchData.team2_id,
        park_name: matchData.park_name,
        address: matchData.address,
        borough: matchData.borough,
        date: matchData.date,
        time: matchData.time,
        start_datetime: matchData.start_datetime
      });
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleParkSearch = (e) => {
    setParkSearch(e.target.value);
    // setup
  };

  const handleParkSelect = (park) => {
    setFormData({
      ...formData,
      park_name: park.Name,
      address: park.Address,
      borough: park.Borough
    });
    setParkSearch(""); // Clear park search input
    setParkResults([]); // Clear park search results
  };

  const handleSubmit = () => {
    // Implement submit logic here
    // call API to save formData
    // After successful submit, you can navigate
    navigate('/'); // Example of navigation after submit
  };

  const handleCancel = () => {
    // Implement cancel logic here
    // navigate back to previous page
    navigate('/'); 
  };

  return (
    <>
      <h1 className="matches-h1 bg-secondary/30 text-white pb-2 pt-5 text-6xl text-center bebas-neue-regular">   
        Edit Match
      </h1>
      <div className="match-form-container">
        <form>
          <h1 className="match-form-h1">Enter match information below</h1>
          <div className="match-form-park-container">
            <label htmlFor="park">Search for a Park</label>
            <input 
              id="park_name"
              value={parkSearch}
              onChange={handleParkSearch}
              className="match-form-input"
            />
            <div className="match-form-parks">
              {parkSearch && parkResults.length > 0 && (
                parkResults.map((park, index) => (
                  <li
                    key={index}
                    onClick={() => handleParkSelect(park)}
                    className="match-form-park-result"
                  >
                    {park.Name}
                  </li>
                ))
              )}
            </div>
          </div>

          <label htmlFor="address">Park Location</label>
          <input 
            id="address"
            value={formData.address}
            readOnly
            placeholder="This Field will be filled in for you"
            onChange={handleChange}
            className="match-form-input"
          />

          <label htmlFor="borough">Borough</label>
          <input 
            id="borough"
            value={formData.borough}
            readOnly
            placeholder="This Field will be filled in for you"
            onChange={handleChange}
            className="match-form-input"
          />

          <label htmlFor="date">Enter Match Date</label>
          <input
            id="date"
            value={formData.date}
            type="date"
            required
            onChange={handleChange}
            className="match-form-input"
          />

          <label htmlFor="time">Enter Time of Match</label>
          <input 
            id="time"
            value={formData.time}
            type="time"
            onChange={handleChange}
            className="match-form-input"
          />
        </form>
        <div className="match-form-btn-container">
          <button onClick={handleSubmit} className="match-form-btn">Submit</button>
          <button onClick={handleCancel} className="match-form-btn danger">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default EditMatch;
