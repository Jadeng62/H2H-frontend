import { useEffect, useState } from "react";

import "../Styles/matches.css"

const Matches = () => {
    const [matchData, setMatchData] = useState([])
    const [toggle, setToggle] = useState(false)
    



    // useEffect(() => {
    //     fetch(`http://localhost:3003/`)
    //     .then((res) => res.data())
    //     .then((data) => setMatch())
    // }, [])

    const handleCreate = (e) => {
        setToggle(!toggle)
        console.log(toggle)
    }


    return (
      <>
          <h1 className="matches-h1 bg-secondary/30  text-white pb-2 pt-5  text-6xl text-center bebas-neue-regular">All Matches</h1>
        <div className="matches-container h-screen">
            <div className="matches-utility-container">
             <section className="mathes-utility-section">
                <button className="matches-btn text-white" onClick={handleCreate}>Create Match</button>
                  <select name="borough" id="borough" className="matches-select">
                    <option>-- Filter Borough --</option>
                    <option value="brooklyn" className="matches-option">Brooklyn</option>
                    <option value="manhattan" className="matches-option">Manhattan</option>
                    <option value="bronx" className="matches-option">Bronx</option>
                    <option value="queens" className="matches-option">Queens</option>
                  </select>
             </section>
          </div>
           <div className="matches-games-container text-yellow-50">
             Dummy Card
           </div>
        </div>
        </>
    )
}

export default Matches 