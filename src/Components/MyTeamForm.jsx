import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "../Styles/teamForm.css"


const MyTeamForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        team_name: '',
        team_pic: '',
        logo: ''
    });
    const [teamCreated, setTeamCreated] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
           [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3003/api/teams/${id}`, {
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
                 id='team-log'
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

export default MyTeamForm;