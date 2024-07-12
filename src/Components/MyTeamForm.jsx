import { useState } from 'react';
import { getUserData } from '../helpers/getUserData';
import "../Styles/teamForm.css";

const MyTeamForm = ({ userDetails, userTeam }) => {
    const [formData, setFormData] = useState({
        team_name: '',
        team_pic: '',
        logo: '',
        point_guard_id: 0,
        shooting_guard_id: 0,
        small_forward_id: 0,
        power_forward_id: 0,
        center_id: 0,
        captain_id: 0,
        team_wins: 0,
        team_loss: 0,
        matches_played: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['team_name', 'team_pic', 'logo'].includes(name)) {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // maybe gotta get team as well using userTeam prop (fx is in myTeam.jsx)
    // gotta log in as a user who has no team (fx is in myTeam.jsx)
    console.log(userTeam)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3003/api/teams/${userDetails.user_team_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
        logo
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
                <button className='team-form-btn'>Create Team</button>
            </form>
        </div>
    );
};

export default MyTeamForm;

