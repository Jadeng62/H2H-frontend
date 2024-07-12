import { useState } from "react";

import "../Styles/matchForm.css"



const MatchForm = ({toggle, setToggle, setMatchData, userDetails, userTeam}) => {
    const [formData, setFormData] = useState({
      address: "",
      state: "",
      city: "",
      zip: "",
      date: ""
    });

    const URL = import.meta.env.VITE_BASE_URL;


    const handleChange = (e) => {
      setFormData({...formData, [e.target.id] : [e.target.value]})
    }



    const handleSubmit = (e) => {
      e.preventDefault()

      const options = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {"Content-Type": "application/json"}
      }
      fetch(`${URL}/api/matches`, options)
       .then((res) => res.json())
       .then((data) => {
        if (data) {
          setMatchData(data)
          setToggle(!toggle)
        } else {
          throw new Error("Problwm with post")
        }
       })
    }

    const handleCancel = (e) => {
      setFormData({
        address: "",
        state: "",
        city: "",
        zip: "",
        date: ""
      })
      setToggle(!toggle)
    }



    return (
        <div className="match-form-container">
        <form className="match-form">
          <h1 className="match-form-h1">Enter Match Details</h1>
        <label htmlFor="address"/>
          <input
            id="address"
            value={formData.address}
            type="text"
            required
            placeholder="Enter Street Address ..."
            onChange={handleChange}
            className="match-form-input"
          />

        <label htmlFor="state" />
          <input
            id="state"
            value={formData.state}
            type="text"
            required
            placeholder="Enter State"
            onChange={handleChange}
            className="match-form-input"
          />

        <label htmlFor="city" />
          <input
            id="city"
            value={formData.city}
            type="text"
            required
            placeholder="Enter City"
            onChange={handleChange}
            className="match-form-input"
          />

        <label htmlFor="zip" />
          <input
            id="zip"
            value={formData.zip}
            type="text"
            required
            placeholder="Enter Zip"
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
       </form>
       <div className="match-form-btn-container">
        <button onClick={handleSubmit} className="match-form-btn">Submit</button>
        <button onClick={handleCancel}  className="match-form-btn danger">Cancel</button>
       </div>
      </div>
    )
}


export default MatchForm