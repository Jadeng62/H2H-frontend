import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "../Styles/modal.css"; // Ensure this path is correct for your project

const GameModal = ({ matches }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isBellGlowing, setIsBellGlowing] = useState(false)
  
    const toggleModal = () =>{
        setIsOpen(!isOpen)
    }

    const hasMatchPassed = (match) => {
        const matchDateTime = new Date(match.start_datetime);
        const currentDateTime = new Date();
        return currentDateTime > matchDateTime;
      };
      const checkUpcomingMatches = (matches) => {
        return matches.some(match => hasMatchPassed(match));
      };
      useEffect(()=>{
        const shouldToggleModal = checkUpcomingMatches(matches);
        setIsBellGlowing(shouldToggleModal)
      },[matches])
  return (
    <div className="modal-container">
      <div className={`bell-container ${isBellGlowing && 'glow'}`} onClick={toggleModal}>
        <FaBell className="bell-icon" />
      </div>
      {isOpen && (
        <div className="modal-content">
          <h2>Upcoming Matches</h2>
          <ul>
            {matches.slice(0, 3).map((match, index) => (
              <li key={index}>
                {new Date(match.start_datetime).toLocaleString()} - {match.city}, {match.state}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <div className="tooltip">Click to see notification</div> */}
    </div>
  );
};

export default GameModal;
