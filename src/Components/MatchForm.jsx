import { useState, useEffect } from "react";

import "../Styles/matchForm.css"



const MatchForm = ({ setMatchData}) => {
    const [parkSearch, setParkSearch] = useState("")
    const [parkLocation, setParkLocation] = useState("")
    const [locationResults, setLocationResults] = useState()
    const [parkResults, setParkResults] = useState()
    const [selectedPark, setSelectedPark] = useState(null)
    const [parkData, setParkData] = useState([])
    const [formData, setFormData] = useState({
      park_name: "",
      address: "",
      date: "",
      start_datetime: ""
    });

    const URL = import.meta.env.VITE_BASE_URL;


    useEffect(() => {
      fetch(`${URL}/api/bball`)
      .then((res) => res.json())
      .then((data) => setParkData(data))
    }, []);
  


    const handleChange = (e) => {
      setFormData({...formData, [e.target.id] : e.target.value})
    }


    const handleParkSearch = (e) => {
       const value = e.target.value
        setParkSearch(value)
     
        const filteredParks = parkData.filter((park) =>
          park.Name.toLowerCase().startsWith(value.toLowerCase())
        )
        console.log(filteredParks)
         setParkResults(filteredParks)
    }


    const handleParkSelect = (parkName, parkLocation) => {
      setParkSearch(parkName)
      setParkLocation(parkLocation)
      setFormData({ ...formData, park_name: parkName, address: parkLocation });
       setParkResults([])
       console.log("This is the park", parkName)
    }


    const handleLocation = (e, parkLocation) => {
      const value = e.target.value
      const selected = parkData.find((court) => court.Prop_ID === value);
       setSelectedPark(selected)
        setParkLocation(value)
     
        const filteredAddress = parkData.filter(
          (park) => park.Location && park.Location.toLowerCase().startsWith(value)
        )
          setLocationResults(filteredAddress)

    }


    const handleLocationSelect = (parkLocation) => {
      setParkLocation(parkLocation)
      setFormData({...formData, address : parkLocation})
       setLocationResults([])
       console.log("This is the park", parkLocation)
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
         console.log(data)
        if (data) {
          setMatchData(data)
        } else {
          throw new Error("Problwm with post")
        }
       })
    }

    const handleCancel = (e) => {
      setFormData({
        park_name: "",
        address: "",
        date: "",
        start_datetime: ""
      })
    }



    return (
      <>
      <h1 className="matches-h1 bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">   
        Create a Match
      </h1>
      <div className="match-form-container">
        <form>
          <h1 className="match-form-h1">Enter match information below</h1>
            <div className="match-form-park-container">
              <label htmlFor="park"/>
              Search for a Park {" "}
               <input 
               id="park_name"
               value={parkSearch}
               onChange={handleParkSearch}
               className="match-form-input"
               />

                <div className="match-form-parks">
                  {parkSearch && parkResults.map((query, index) => (
                    <li
                     key={index}
                     onClick={() => handleParkSelect(query.Name)}
                     className="match-form-park-result"
                     >{query.Name}</li>
                  ))}
                  </div>
            </div>
    
          <div>
              <label htmlFor="address"/>
              Park Location {" "}
               <input 
               id="address"
               value={parkLocation}
               readOnly
               onChange={handleLocation}
               className="match-form-input"
               />
             
              <ul>
                {parkLocation && locationResults.map((park) => (
                  <li
                  key={park.Prop_ID}
                  onClick={() => handleLocationSelect(park.Location)}
                  >{park.Location}</li>
                ))}
              </ul>
            
          </div>  

        <label htmlFor="date" />
        Enter Match Date{" "}
          <input
            id="date"
            value={formData.date} 
            type="date"
            required
            onChange={handleChange}
            className="match-form-input"
          />
           
            <label htmlFor="start_datetime"/>
             Enter Time of Match{" "}
              <input 
              id="start_datetime"
              value={formData.start_datetime}
              type="time"
              onChange={handleChange}
              className="match-form-input"
              />
       </form>
       <div className="match-form-btn-container">
        <button onClick={handleSubmit} className="match-form-btn">Submit</button>
        <button onClick={handleCancel}  className="match-form-btn danger">Cancel</button>
       </div>
      </div>
      </>
    )
}


export default MatchForm