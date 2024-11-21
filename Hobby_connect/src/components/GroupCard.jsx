import React from 'react';
import { Link } from 'react-router-dom';
import './GroupCard.css';

function GroupCard({ group }) {
  return (
    <div className="group-card">
      <img src={`https://picsum.photos/300/200?random=${group.id}`} alt={group.name} />
      <h3>{group.name}</h3>
      <p>{group.description}</p>
      <Link to={`/group/${group.id}`}>View Group</Link>
    </div>
  );
}

export default GroupCard;
