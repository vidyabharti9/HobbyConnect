import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [hobbies, setHobbies] = useState(['Photography', 'Gaming', 'Fitness']);
  const [newHobby, setNewHobby] = useState('');

  const handleAddHobby = () => {
    if (newHobby.trim() !== '' && !hobbies.includes(newHobby)) {
      setHobbies([...hobbies, newHobby]);
      setNewHobby('');
    }
  };

  return (
    <div className="dashboard">
      {/* Profile Picture and Basic Info */}
      <div className="profile-section">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="basic-info">
          <h1 className="user-name">John Doe</h1>
          <p className="user-email">john.doe@example.com</p>
        </div>
      </div>

      {/* Right Section: Details */}
      <div className="details-section">
        {/* Hobbies */}
        <div className="hobbies-section">
          <h2>Your Hobbies</h2>
          <ul className="hobby-list">
            {hobbies.map((hobby, index) => (
              <li key={index} className="hobby-item">
                {hobby}
              </li>
            ))}
          </ul>
          <div className="add-hobby-form">
            <input
              type="text"
              placeholder="Add a new hobby"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              className="hobby-input"
            />
            <button onClick={handleAddHobby} className="add-hobby-button">
              Add Hobby
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="settings-section">
          <h2>Settings</h2>
          <button className="settings-button">Manage Preferences</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
