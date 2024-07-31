import { useState, useEffect } from "react";
import { getUserData } from "../helpers/getUserData";
import { useNavigate } from "react-router-dom";
import "../Styles/teamForm.css";
import UploadWidget from "./UploadWidget";

const MyTeamForm = ({ isUserTeamCaptin, setIsUserCaptin, setNavDetails }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");

  const [formData, setFormData] = useState({
    team_name: "",
    team_pic: "",
    logo: "",
    captain_id: null, // maybe keep like this
    point_guard_id: null,
    shooting_guard_id: null,
    small_forward_id: null,
    power_forward_id: null,
    center_id: null,
  });

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function getUser() {
      try {
        const user = await getUserData();
        const position =
          (await user.position.replace(" ", "_").toLowerCase()) + "_id";
        console.log(position);
        setUserDetails(user); // This updates userDetails when data is fetched
        //  setFormData({...formData, captain_id : user.id})
        setFormData({ ...formData, captain_id: user.id, [position]: user.id });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    setFormData({ ...formData, team_pic: cloudinaryURL });
  }, [cloudinaryURL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!userDetails || !userDetails.user_team_id) {
    //     console.error('User details or user team ID missing.');
    //     return;
    // }

    try {
      console.log("Creating team with form data:", formData);
      const response = await fetch(`${URL}/api/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_name: formData.team_name,
          team_pic: formData.team_pic,
          logo: formData.logo,
          captain_id: formData.captain_id,
          point_guard_id: formData.point_guard_id,
          shooting_guard_id: formData.shooting_guard_id,
          small_forward_id: formData.small_forward_id,
          power_forward_id: formData.power_forward_id,
          center_id: formData.center_id,
          team_wins: null,
          team_loss: null,
          matches_played: null,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newTeamID = data.id;
          fetch(`${URL}/api/auth/user/${userDetails.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_team_id: newTeamID,
            }),
          });
          setNavDetails({ ...userDetails, user_team_id: newTeamID });
          navigate(`/myTeam/${newTeamID}`);
        });

      //   if (!response.ok) {
      //     throw new Error("Team creation failed");
      //   }

      //   const createdTeam = await response.json();
      //   console.log("Team created:", createdTeam);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    setFormData({
      team_name: "",
      team_pic: "",
      logo: "",
      captain_id: null,
      point_guard_id: null,
      shooting_guard_id: null,
      small_forward_id: null,
      power_forward_id: null,
      center_id: null,
    });
  };

  const {
    team_name,
    team_pic,
    logo,
    captain_id,
    point_guard_id,
    shooting_guard_id,
    small_forward_id,
    power_forward_id,
    center_id,
  } = formData;

  return (
    <div className="team-form-container">
      {console.log("form", formData)}
      <form className="team-form bg-white">
        <h2 className="team-form-h2">Create Your Team</h2>
        <label htmlFor="team_name" className="team-form-label">
          Team Name:
          <input
            id="team_name"
            type="text"
            name="team_name"
            required
            value={team_name}
            placeholder="Enter Team Name ..."
            className="team-form-input"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="team_pic" className="team-form-label">
          Team Picture URL:
          {/* <input
            id="team_pic"
            type="text"
            name="team_pic"
            required
            value={team_pic}
            placeholder="Enter Photo (optional)"
            className="team-form-input"
            onChange={handleChange}
          /> */}
          <UploadWidget
            cloudinaryURL={cloudinaryURL}
            setCloudinaryURL={setCloudinaryURL}
          />
        </label>

        {/* <label htmlFor='team_pic' className='team-form-label'>
                    Team Picture URL:
                    <input
                        id='team_pic'
                        type="text"
                        name="team_pic"
                        required
                        value={team_pic}
                        placeholder='Enter Photo (optional)'
                        className='team-form-input'
                        onChange={handleChange} />
                </label>
                <label htmlFor='logo' className='team-form-label'>
                    Logo URL:
                    <input
                        id='logo'
                        type="text"
                        name="logo"
                        required
                        value={logo}
                        placeholder='Enter Team Logo ...'
                        className='team-form-input'
                        onChange={handleChange} />
                </label> */}
        {/* <button onClick={handleSubmit} className='team-form-btn'>Create Team</button> */}
        <div className="flex justify-center gap-2">
          <button
            className="team-form-btn"
            type="submit"
            onClick={handleSubmit}
          >
            Create Team
          </button>
          <button
            onClick={handleCancel}
            className="bg-background text-white px-8 py-4 rounded hover:bg-secondary hover:text-background"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyTeamForm;
