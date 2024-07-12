import React, { useState } from "react";
import { useParams } from "react-router-dom";

const MatchDetails = () => {
  const [match, setMatch] = useState({});

  const { id } = useParams();

  return (
    <div className="text-text">
      <h1>Match Details: {id}</h1>
    </div>
  );
};

export default MatchDetails;
