import { useState, useEffect } from 'react';
import { getUserData } from '../helpers/getUserData';
import "../Styles/teamForm.css";

const MyTeamForm = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [formData, setFormData] = useState({
        team_name: '',
        team_pic: '',
        logo: '',
        captain_id: null, // maybe keep like this
        point_guard_id: null,
        shooting_guard_id: null,
        small_forward_id: null,
        power_forward_id: null,
        center_id: null
    });

    useEffect(() => {
        async function getUser() {
            try {
                const user = await getUserData();
                setUserDetails(user); // This updates userDetails when data is fetched
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        getUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "player") {
            setFormData({
                ...formData,
                [value]: value
            });
            setUserDetails({
                [userDetails.position]: "user input" // using as placeholder which is a number - text user selects from dropdown goes here actaully
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
                body: JSON.stringify({
                    team_name: formData.team_name,
                    team_pic: formData.team_pic,
                    logo: formData.logo,
                    captain_id: userDetails.id, // Use userDetails.id when available
                    point_guard_id: formData.point_guard_id
                    ,
                    shooting_guard_id: formData.power_forward_id,
                    small_forward_id: formData.shooting_guard_id,
                    power_forward_id: formData.small_forward_id,
                    center_id: formData.center_id,
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

    if (!userDetails) {
        return <div>Loading...</div>; // in case we don't have user details populate
    }
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
                <select name="player" id="player" className="team-form-select" onChange={handleChange}>
                    <option value="">-- Player Position --</option>
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