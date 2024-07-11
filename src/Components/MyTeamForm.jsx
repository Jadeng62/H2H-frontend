import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyTeamForm = () => {
  const { id } = useParams(); 
    const [formData, setFormData] = useState({
        teamName: '',
        teamPic: '',
        logo: '',
        pointGuardId: 0,
        shootingGuardId: 0,
        smallForwardId: 0,
        powerForwardId: 0,
        centerId: 0,
        captainId: 0,
        teamWins: 0,
        teamLoss: 0,
        matchesPlayed: 0,
    });

    const [teamCreated, setTeamCreated] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'pointGuardId' || name === 'shootingGuardId' || name === 'smallForwardId' || 
                    name === 'powerForwardId' || name === 'centerId' || name === 'captainId' ||
                    name === 'teamWins' || name === 'teamLoss' || name === 'matchesPlayed' ? parseInt(value, 10) : value
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
        teamName,
        teamPic,
        logo,
        pointGuardId,
        shootingGuardId,
        smallForwardId,
        powerForwardId,
        centerId,
        captainId,
        teamWins,
        teamLoss,
        matchesPlayed,
    } = formData;

    return (
        <form onSubmit={handleSubmit} className='bg-white'>
            <label>
                Team Name:
                <input type="text" name="teamName" value={teamName} onChange={handleChange} />
            </label>
            <br />
            <label>
                Team Picture URL:
                <input type="text" name="teamPic" value={teamPic} onChange={handleChange} />
            </label>
            <br />
            <label>
                Logo URL:
                <input type="text" name="logo" value={logo} onChange={handleChange} />
            </label>
            <br />
            <label>
                Point Guard ID:
                <input type="number" name="pointGuardId" value={pointGuardId} onChange={handleChange} />
            </label>
            <br />
            <label>
                Shooting Guard ID:
                <input type="number" name="shootingGuardId" value={shootingGuardId} onChange={handleChange} />
            </label>
            <br />
            <label>
                Small Forward ID:
                <input type="number" name="smallForwardId" value={smallForwardId} onChange={handleChange} />
            </label>
            <br />
            <label>
                Power Forward ID:
                <input type="number" name="powerForwardId" value={powerForwardId} onChange={handleChange} />
            </label>
            <br />
            <label>
                Center ID:
                <input type="number" name="centerId" value={centerId} onChange={handleChange} />
            </label>
            <br />
            <label>
                Captain ID:
                <input type="number" name="captainId" value={captainId} onChange={handleChange} />
            </label>
            <br />
            <label>
                Team Wins:
                <input type="number" name="teamWins" value={teamWins} onChange={handleChange} />
            </label>
            <br />
            <label>
                Team Loss:
                <input type="number" name="teamLoss" value={teamLoss} onChange={handleChange} />
            </label>
            <br />
            <label>
                Matches Played:
                <input type="number" name="matchesPlayed" value={matchesPlayed} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyTeamForm;