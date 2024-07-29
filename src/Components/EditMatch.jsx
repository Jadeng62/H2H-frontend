import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../helpers/getUserData";
import "../Styles/matchForm.css";

const URL = import.meta.env.VITE_BASE_URL;
const EditMatch = ({ setMatch, closeModal }) => {
  const { id } = useParams(); // Fetching the match ID from the URL
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    creator_id: "",
    team1_id: "",
    team2_id: "",
    park_name: "",
    address: "",
    borough: "",
    date:"",
    time: "",
    start_datetime: "",
    match_completed: false,
    match_winner: "",
    match_loser: ""
  });
  const [parkSearch, setParkSearch] = useState("");
  const [parkResults, setParkResults] = useState([]);
  const [parkData, setParkData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const user = await getUserData();
      if (user) {
        setUser(user);
        fetchMatchData(id);
      }
    }
    fetchData();
  }, [id]);

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
    R: "Staten Island"
  };
  
  const handlePropID = (Prop_ID) => {
    const firstLetter = Prop_ID[0];
    return boroughIdentifier[firstLetter] || "";
  };

  const fetchMatchData = async (matchId) => {
    try {
        const response = await fetch(`${URL}/api/matches/${matchId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch match data");
    }
    const matchData = await response.json();
    console.log(matchData);
  
    // Parse date and time from start_datetime
    const startDate = new Date(matchData.start_datetime);
    const dateStr = startDate.toISOString().split('T')[0]; // Get YYYY-MM-DD
    const timeStr = startDate.toISOString().split('T')[1].substring(0, 5); // Get HH:MM
  
    setFormData({
        creator_id: matchData.creator_id,
        team1_id: matchData.team1_id,
        team2_id: matchData.team2_id,
        park_name: matchData.park_name,
        address: matchData.address,
        borough: matchData.borough,
        date: dateStr,
        time: timeStr,
        start_datetime: matchData.start_datetime,
        match_completed: matchData.match_completed || false,
        match_winner: matchData.match_winner || "",
        match_loser: matchData.match_loser || ""
    });
    setParkSearch(matchData.park_name);
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
    const value = e.target.value;
    setParkSearch(value);

    const filteredParks = parkData.filter((park) => park.Name &&
      park.Name.toLowerCase().startsWith(value.toLowerCase())
    );
    setParkResults(filteredParks);
  };

  const handleParkSelect = (park) => {
    const borough = handlePropID(park.Prop_ID); // Use handlePropID to get the borough

    setFormData({
      ...formData,
      park_name: park.Name,
      address: park.Location,
      borough: borough
    });
    setParkSearch(park.Name); // used to clear it but should persist now after being selected
    setParkResults([]); // Clear park search results
  };

  const handleSubmit = async () => {
    if (!user) {
        console.error("No USER DATA")
        return;
    }

    if (!formData.date || !formData.time) {
        console.error("No time provided")
         return;
    }

    const dateTimeStr = `${formData.date}T${formData.time}:00Z`;
    const dateTime = new Date(dateTimeStr)

    const formattedData = {
      creator_id: user.id,
      team1_id: user.user_team_id,
      team2_id: null,
      park_name: formData.park_name,
      address: formData.address,
      borough: formData.borough,
      start_datetime : dateTime.toISOString(),
      match_completed: false, 
      match_winner: null,
      match_loser: null
    }
    try {
      const response = await fetch(`${URL}/api/matches/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formattedData),
        headers: {"Content-Type": "application/json"}
      });

      if (!response.ok) {
        throw new Error('Failed to update match data');
      }

      const updatedMatch = await response.json();
      setMatch(updatedMatch);
      closeModal()
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <>
      <h1 className="matches-h1 bg-white/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">
        Edit Match
      </h1>
      <div className="flex justify-center">
        <div
          className="bg-white m-10 rounded-xl p-7 sm:4/5 md:w-2/3 lg:w-1/2 match-form"
        >        
        <form>
          <div className="match-form-park-container ">
            <label htmlFor="park_name">
              Search for a Park
            </label>
            <input 
              id="park_name"
              value={parkSearch}
              placeholder="Enter Park Name"
              onChange={handleParkSearch}
              className="match-form-input"
            />
            <div className="match-form-parks bg-background/10 rounded-lg mb-5 h-auto max-h-36 overflow-y-auto">
                {parkSearch && parkResults.length > 0 ? (
                  <>
                    {parkResults.map((park, index) => (
                      <li
                        key={index}
                        onClick={() => handleParkSelect(park)}
                        className="match-form-park-result hover:bg-white/30 p-2 rounded-lg m-2 list-none"
                      >
                        {park.Name}
                      </li>
                    ))}{" "}
                  </>
                ) : (
                  <div className="h-auto text-wrap">
                    <h3 className="text-center overflow-y-auto">
                      {/* {" "} */}
                    </h3>
                  </div>
                )}
              </div>
          </div>
          <label htmlFor="address">Park Location</label>
          <input 
            id="address"
            value={formData.address}
            readOnly
            placeholder="Enter Park Name to View Location"
            className="match-form-input"
          />

          <label htmlFor="borough">Borough</label>
          <input 
            id="borough"
            value={formData.borough}
            readOnly
            placeholder="Enter Park Name to View Borough"
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
            className="match-form-input mb-5"
          />
        </form>
        <div className="flex flex-row justify-center gap-2">
          <button
              onClick={handleSubmit}
              className="bg-accent  text-white px-8 py-4 rounded hover:bg-secondary hover:text-background md:w-1/2"
          >
            Edit Match
          </button>
          <button onClick={closeModal}
            className="bg-background  text-white px-8 py-4 rounded hover:bg-secondary hover:text-background md:w-1/2"      
          >
            Cancel
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMatch;