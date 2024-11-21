import React from 'react';
import { useParams } from 'react-router-dom';
import './GroupDetails.css';

function GroupDetails() {
  const { id } = useParams();

  return (
    <div className="group-details">
      <h1>Group Details - ID: {id}</h1>
      <p>Explore detailed information about the group, upcoming events, and discussions.</p>
    </div>
  );
}

export default GroupDetails;
