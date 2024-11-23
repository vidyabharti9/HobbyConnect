import React from 'react';
import GroupCard from '../components/GroupCard';
import './Home.css';

const mockGroups = [
  { id: 1, name: 'Photography Enthusiasts', description: 'Share photography tips and tricks' },
  { id: 2, name: 'Book Club', description: 'Discuss and recommend books' },
  { id: 3, name: 'Fitness Junkies', description: 'Stay fit together and share workouts' },
  { id: 4, name: 'Gaming Legends', description: 'Connect with gamers around the world' },
  { id: 5, name: 'Cooking Masters', description: 'Swap recipes and share cooking tips' },
  { id: 6, name: 'DIY Crafters', description: 'Unleash your creativity with DIY projects' },
  { id: 7, name: 'Travel Buddies', description: 'Plan trips and share travel experiences' },
  { id: 8, name: 'Music Lovers', description: 'Discuss your favorite bands and songs' },
  { id: 9, name: 'Pet Parents', description: 'Share stories and tips about pet care' },
];

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Hobby Connect</h1>
        <p>Your platform to find, share, and grow in your hobbies!</p>
        <button>Start Exploring</button>
      </div>
      <h2>Popular Hobby Groups</h2>
      <div className="group-grid">
        {mockGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

export default Home;
