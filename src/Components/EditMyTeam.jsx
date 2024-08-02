import { useState, useEffect } from "react";
import { getUserData } from "../helpers/getUserData";
import { useNavigate } from "react-router-dom";
import "../Styles/teamForm.css";
import UploadWidget from "./UploadWidget";

const EditMyTeam = ({ closeModal }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");

  const [formData, setFormData] = useState({
    team_name: "",
    team_pic: "",
    logo: "",
    point_guard_id: null,
    shooting_guard_id: null,
    small_forward_id: null,
    power_forward_id: null,
    center_id: null,
    captain_id: null,
    team_wins: 0,
    team_loss: 0,
    matches_played: 0,
  });
  const [team, setTeam] = useState(null);

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserData();
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchTeam() {
      if (!userDetails || !userDetails.user_team_id) return;

      try {
        const response = await fetch(
          `${URL}/api/teams/${userDetails.user_team_id}`
        );

        if (!response.ok) {
          throw new Error("Team not found");
        }

        const data = await response.json();
        setTeam(data);
        setFormData({
          team_name: data.team_name,
          team_pic: data.team_pic,
          logo: data.logo,
          point_guard_id: data.point_guard_id,
          shooting_guard_id: data.shooting_guard_id,
          small_forward_id: data.small_forward_id,
          power_forward_id: data.power_forward_id,
          center_id: data.center_id,
          captain_id: data.captain_id,
          team_wins: data.team_wins,
          team_loss: data.team_loss,
          matches_played: data.matches_played,
        });
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    }
    fetchTeam();
  }, [userDetails]);

  useEffect(() => {
    setFormData({ ...formData, team_pic: cloudinaryURL });
  }, [cloudinaryURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update team data
      const response = await fetch(
        `${URL}/api/teams/${userDetails.user_team_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Team update failed");
      }

      console.log("Team updated successfully");
      navigate(`/myTeam/${userDetails.user_team_id}`);
      closeModal(); // to close modal after submitting
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  const { team_name, team_pic, logo } = formData;

  if (!team) {
    return <p className="bg-white">Loading...</p>;
  }

  return (
    <div className="team-form-container m-auto">
      <form onSubmit={handleSubmit} className="team-form bg-white">
        <h2 className="team-form-h2">Edit My Team</h2>
        <label htmlFor="team-name" className="team-form-label">
          Team Name:
          <input
            id="team-name"
            type="text"
            name="team_name"
            value={team_name}
            placeholder="Enter Team Name ..."
            className="team-form-input"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="team_pic" className="team-form-label">
          Upload Team Picture:
          <UploadWidget
            cloudinaryURL={cloudinaryURL}
            setCloudinaryURL={setCloudinaryURL}
          />
        </label>
        <div className="flex justify-center flex-col gap-4 font-bold">
          <button
            className="bg-accent text-white px-8 py-4 rounded-md hover:bg-secondary hover:text-background"
            type="submit"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
          <button
            onClick={closeModal}
            className="bg-background text-white px-8 py-4 rounded-md hover:bg-secondary hover:text-background"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMyTeam;
