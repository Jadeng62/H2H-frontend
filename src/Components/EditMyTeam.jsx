import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { getUserData } from '../helpers/getUserData';
import '../Styles/teamForm.css';

const EditMyTeam = ({ userDetails, userTeam }) => {
    // const { id } = useParams();
    // const [formData, setFormData] = useState({
    //     team_name: '',
    //     team_pic: '',
    //     logo: ''
    // });

    // ALL THE KEYS are needed so that values aren't replaced by null when user edits form
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
    
    const [team, setTeam] = useState(null);

    // pass on prop instead
    console.log(userDetails)
    // console.log(userDetails.user_team_id)
    // console.log(userTeam)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData();
                console.log('User data:', userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchTeam = async () => {
            if (!userDetails || !userDetails.user_team_id) {
                return;
            }
            try {
                const response = await fetch(`http://localhost:3003/api/teams/${userDetails.user_team_id}`);
                if (!response.ok) {
                    throw new Error('Team not found');
                }
                const data = await response.json();
                setTeam(data);
                setFormData({
                    ...data,
                    team_name: data.team_name,
                    team_pic: data.team_pic,
                    logo: data.logo,
                    // added rest of the fields which should be numbers aka INT on backend
                    point_guard_id: data.point_guard_id || 0,
                    shooting_guard_id: data.shooting_guard_id || 0,
                    small_forward_id: data.small_forward_id || 0,
                    power_forward_id: data.power_forward_id || 0,
                    center_id: data.center_id || 0,
                    captain_id: data.captain_id || 0,
                    team_wins: data.team_wins || 0,
                    team_loss: data.team_loss || 0,
                    matches_played: data.matches_played || 0
                });
            } catch (error) {
                console.log('Error fetching team:', error);
            }
        };
    
        fetchTeam();
    }, [userDetails?.user_team_id]);


    // added line 88 (if statement) so only allowed fields gets changed by user
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['team_name', 'team_pic', 'logo'].includes(name)) {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3003/api/teams/${userDetails.user_team_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Team update failed');
            }
            console.log('Team updated successfully');
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    const { team_name, team_pic, logo } = formData;

    // un comment once connected to myTeam.jsx
    // if (!team) {
    //     return <p className='bg-white'>Loading...</p>;
    // }

    return (
        <div className='team-form-container'>
            <form onSubmit={handleSubmit} className='team-form bg-white'>
                <h2 className='team-form-h2'>Edit My Team</h2>
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
                <button className='team-form-btn'>Submit</button>
            </form>
        </div>
    );
};

export default EditMyTeam;