import { useState } from 'react';

const MyTeamForm = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'pointGuardId' || name === 'shootingGuardId' || name === 'smallForwardId' || 
                    name === 'powerForwardId' || name === 'centerId' || name === 'captainId' ||
                    name === 'teamWins' || name === 'teamLoss' || name === 'matchesPlayed' ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //useeffect for POST fetch
        console.log(formData);
    };

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
        <form onSubmit={handleSubmit}>
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