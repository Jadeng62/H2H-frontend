import React from "react";
import { useParams } from "react-router-dom";

const TeamByID = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>TeamByID: {id}</h1>
    </div>
  );
};

export default TeamByID;
