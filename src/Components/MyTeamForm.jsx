import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const MyTeamForm = () => {
    const { id } = useParams();
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
        matches_played: 0,
    });
    const [teamCreated, setTeamCreated] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'point_guard_id' || name === 'shooting_guard_id' || name === 'small_forward_id' || 
                    name === 'power_forward_id' || name === 'center_id' || name === 'captain_id' ||
                    name === 'team_wins' || name === 'team_loss' || name === 'matches_played' ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3003/api/teams', {
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
            setTeamCreated(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (teamCreated) {
            console.log('Team created:', teamCreated);
        }
    }, [teamCreated]);

    const {
        team_name,
        team_pic,
        logo,
        point_guard_id,
        shooting_guard_id,
        small_forward_id,
        power_forward_id,
        center_id,
        captain_id,
        team_wins,
        team_loss,
        matches_played,
    } = formData;

    return (
        <form onSubmit={handleSubmit} className='bg-white'>
            <h2>Team ID: {id}</h2>
            <label>
                Team Name:
                <input type="text" name="team_name" value={team_name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Team Picture URL:
                <input type="text" name="team_pic" value={team_pic} onChange={handleChange} />
            </label>
            <br />
            <label>
                Logo URL:
                <input type="text" name="logo" value={logo} onChange={handleChange} />
            </label>
            <br />
            <label>
                Point Guard ID:
                <input type="number" name="point_guard_id" value={point_guard_id} onChange={handleChange} />
            </label>
            <br />
            <label>
                Shooting Guard ID:
                <input type="number" name="shooting_guard_id" value={shooting_guard_id} onChange={handleChange} />
            </label>
            <br />
            <label>
                Small Forward ID:
                <input type="number" name="small_forward_id" value={small_forward_id} onChange={handleChange} />
            </label>
            <br />
            <label>
                Power Forward ID:
                <input type="number" name="power_forward_id" value={power_forward_id} onChange={handleChange} />
            </label>
            <br />
            <label>
                Center ID:
                <input type="number" name="center_id" value={center_id} onChange={handleChange} />
            </label>
            <br />
            <label>
                Captain ID:
                <input type="number" name="captain_id" value={captain_id} onChange={handleChange} />
            </label>
            <br />
            <label>
                Team Wins:
                <input type="number" name="team_wins" value={team_wins} onChange={handleChange} />
            </label>
            <br />
            <label>
                Team Loss:
                <input type="number" name="team_loss" value={team_loss} onChange={handleChange} />
            </label>
            <br />
            <label>
                Matches Played:
                <input type="number" name="matches_played" value={matches_played} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyTeamForm;