import { useEffect, useState } from "react";

import "../Styles/matches.css"

const Matches = () => {
    const [match, setMatch] = useState([])



    useEffect(() => {
        fetch(`http://localhost:3003/`)
        .then((res) => res.data())
        .then((data) => setMatch())
    }, [])


    return (
        <div className="matches-container">
            <h1 className="matches-h1 h-screen text-white">Upcoming Player Matches</h1>
                <div className="matches-utility">
                    <section className="mathes-utility-section">
                        <ul>
                            <li>Create</li>
                            <li></li>
                        </ul>
                    </section>
                </div>
        </div>
    )
}

export default Matches 