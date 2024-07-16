import { useState } from 'react';
import { getUserData } from '../helpers/getUserData';
import "../Styles/teamForm.css";

const MyTeamForm = ({ userDetails, userTeam }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [formData, setFormData] = useState({
        team_name: '',
        team_pic: '',
        logo: '',
        captain_id: userDetails.id,
        point_guard_id: null,
        shooting_guard_id: null,
        small_forward_id: null,
        power_forward_id: null,
        center_id: null
    });

    // import helper function instead of using prop for userDetails
    // one more state for user position with user team id from users table
    // at first it'll be null but useState would update with userDetails.id
    useEffect(() => {
        async function getUser() {
          const user = await getUserData();
          if (user) {
            setUserDetails(user);
          }
        }
    
        getUser();
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "player") { // for tracking select drop down menu values
            setFormData({
                ...formData,
                point_guard_id: value,
                shooting_guard_id: value,
                small_forward_id: value,
                power_forward_id: value,
                center_id: value
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Creating team with form data:', formData);

            const response = await fetch(`http://localhost:3003/api/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // put use state to update the ids of the positions
                body: JSON.stringify({
                    // add uid from user table  
                    team_name: formData.team_name,
                    team_pic: formData.team_pic,
                    logo: formData.logo,
                    captain_id: userDetails.id,
                    point_guard_id: null,
                    shooting_guard_id: null,
                    small_forward_id: null,
                    power_forward_id: null,
                    center_id: null,
                    team_wins: null,
                    team_loss: null,
                    matches_played: null
                }),
            });

            if (!response.ok) {
                throw new Error('Team creation failed');
            }

            const data = await response.json();
            console.log('Team created:', data);

        } catch (error) {
            console.error('Error creating team:', error);
        }
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
        center_id
    } = formData;

    return (
        <div className='team-form-container'>
            <form onSubmit={handleSubmit} className='team-form bg-white'>
                <h2 className='team-form-h2'>Create Team</h2>
                <label htmlFor='team-name' className='team-form-label'>
                    Team Name:
                    <input
                        id='team-name'
                        type="text"
                        name="team_name"
                        value={team_name}
                        placeholder='Enter Team Name ...'
                        className='team-form-input'
                        onChange={handleChange} />
                </label>
                <label htmlFor='team-pic' className='team-form-label'>
                    Team Picture URL:
                    <input
                        id='team-pic'
                        type="text"
                        name="team_pic"
                        value={team_pic}
                        placeholder='Enter Photo (optional)'
                        className='team-form-input'
                        onChange={handleChange} />
                </label>
                <label htmlFor='team-logo' className='team-form-label'>
                    Logo URL:
                    <input
                        id='team-logo'
                        type="text"
                        name="logo"
                        value={logo}
                        placeholder='Enter Team Logo ...'
                        className='team-form-input'
                        onChange={handleChange} />
                </label>
                <select name="player" id="player" className="team-form-select">
                    <option>-- Player Position --</option>
                    <option value={point_guard_id} className="team-form-option">
                            Point Guard
                    </option>
                    <option value={shooting_guard_id} className="team-form-option">
                            Shooting Guard
                    </option>
                    <option value={small_forward_id} className="team-form-option">
                            Small Forward
                    </option>
                    <option value={power_forward_id} className="team-form-option">
                            Power Forward
                    </option>
                    <option value={center_id} className="team-form-option">
                            Center
                    </option>
                </select>
                <button type="submit" className='team-form-btn'>Create Team</button>
            </form>
        </div>
    );
};

export default MyTeamForm;
