import { useState } from "react";



const MatchForm = () => {
    const [formData, setFormData] = useState({
        team: "",
        match_type: "",
        date: ""
    });



    const handleSubmit = () => {

    }


    return (
        <div className="match-form-container">
        <label htmlFor="team"/>
          <input
            id="team"
            value={formData.team}
            type="text"
            required
            placeholder="Enter Team Name ..."
            onChange={handleChange}
            className="match-form-input"
          />

        <label htmlFor="type" />
          <input
            id="type"
            value={formData.type}
            type="text"
            required
            placeholder="Enter Match Type ..."
            onChange={handleChange}
            className="match-form-input"
          />

        <label htmlFor="date" />
          <input
            id="date"
            value={formData.date}
            type="date"
            required
            onChange={handleChange}
            className="match-form-input"
          />
        </div>
    )
}


export default MatchForm