import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GroupDetails.css';

function GroupDetails() {
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState({});
  const [members, setMembers] = useState([]);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    // Fetch group details and members (mock data for now)
    const fetchedGroupDetails = {
      name: 'Photography Enthusiasts',
      description:
        'A group for photography lovers to share their work, learn from each other, and explore the world through lenses.',
      features: [
        'Weekly photo challenges',
        'Exclusive tutorials and webinars',
        'Community photo gallery',
      ],
    };

    const fetchedMembers = [
      { id: 1, name: 'John Doe', profilePic: 'https://via.placeholder.com/50' },
      { id: 2, name: 'Jane Smith', profilePic: 'https://via.placeholder.com/50' },
      { id: 3, name: 'Alice Johnson', profilePic: 'https://via.placeholder.com/50' },
    ];

    setGroupDetails(fetchedGroupDetails);
    setMembers(fetchedMembers);
  }, [id]);

  const handleJoinGroup = () => {
    setIsMember(true);
  };

  const handleInviteMember = () => {
    alert('Feature to invite members coming soon!');
  };

  return (
    <div className="group-details">
      {/* Group Header */}
      <div className="group-header">
        <h1>{groupDetails.name}</h1>
        <p>{groupDetails.description}</p>
        {!isMember ? (
          <button className="join-group-button" onClick={handleJoinGroup}>
            Join Group
          </button>
        ) : (
          <p className="joined-message">You are a member of this group.</p>
        )}
      </div>

      {/* Group Features */}
      <div className="group-features">
        <h2>Group Features</h2>
        <ul>
          {groupDetails.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Group Members */}
      <div className="group-members">
        <h2>Members</h2>
        <div className="members-list">
          {members.map((member) => (
            <div key={member.id} className="member-card">
              <img
                src={member.profilePic}
                alt={`${member.name}'s profile`}
                className="member-pic"
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
        {isMember && (
          <button className="invite-button" onClick={handleInviteMember}>
            Invite Members
          </button>
        )}
      </div>
    </div>
  );
}

export default GroupDetails;
