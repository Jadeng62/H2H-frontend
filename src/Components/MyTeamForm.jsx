import { useState } from 'react';

const MyTeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const [teamPic, setTeamPic] = useState('');
  const [logo, setLogo] = useState('');
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [player3Id, setPlayer3Id] = useState('');
  const [player4Id, setPlayer4Id] = useState('');
  const [player5Id, setPlayer5Id] = useState('');
  const [captainId, setCaptainId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      team_name: teamName,
      team_pic: teamPic,
      logo: logo,
      player1_id: player1Id,
      player2_id: player2Id,
      player3_id: player3Id,
      player4_id: player4Id,
      player5_id: player5Id,
      captain_id: captainId,
    };
    console.log(formData);
    
    // Add fetch aqui!!
    
    // Clear form fields after submission
    setTeamName('');
    setTeamPic('');
    setLogo('');
    setPlayer1Id('');
    setPlayer2Id('');
    setPlayer3Id('');
    setPlayer4Id('');
    setPlayer5Id('');
    setCaptainId('');
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white'>
      <div>
        <label>
          Team Name:
          <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Team Picture URL:
          <input type="text" value={teamPic} onChange={(e) => setTeamPic(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Logo URL:
          <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Player 1 ID:
          <input type="text" value={player1Id} onChange={(e) => setPlayer1Id(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Player 2 ID:
          <input type="text" value={player2Id} onChange={(e) => setPlayer2Id(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Player 3 ID:
          <input type="text" value={player3Id} onChange={(e) => setPlayer3Id(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Player 4 ID:
          <input type="text" value={player4Id} onChange={(e) => setPlayer4Id(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Player 5 ID:
          <input type="text" value={player5Id} onChange={(e) => setPlayer5Id(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Captain ID:
          <input type="text" value={captainId} onChange={(e) => setCaptainId(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MyTeamForm;