import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GroupDetails.css';

const groupsData = {
  1: {
    name: 'Photography Enthusiasts',
    description: 'Share photography tips and tricks',
    features: [
      'Weekly photo challenges',
      'Exclusive tutorials and webinars',
      'Community photo gallery',
      'Photo editing contests',
      'Member spotlight of the week',
      'Monthly photo exhibitions',
    ],
    members: [
      { id: 1, name: 'John Doe', profilePic: 'https://via.placeholder.com/50' },
      { id: 2, name: 'Jane Smith', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  2: {
    name: 'Book Club',
    description: 'Discuss and recommend books',
    features: [
      'Weekly book discussions',
      'Author Q&A sessions',
      'Reading challenges',
      'Book recommendations from members',
      'Exclusive author interviews',
      'Literary quizzes and games',
    ],
    members: [
      { id: 3, name: 'Emily Brown', profilePic: 'https://via.placeholder.com/50' },
      { id: 4, name: 'Mark Taylor', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  3: {
    name: 'Fitness Junkies',
    description: 'Stay fit together and share workouts',
    features: [
      'Daily fitness tips',
      'Workout challenges',
      'Progress tracking',
      'Weekly workout routines',
      'Virtual fitness meetups',
      'Fitness nutrition guides',
    ],
    members: [
      { id: 5, name: 'Mike Johnson', profilePic: 'https://via.placeholder.com/50' },
      { id: 6, name: 'Anna White', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  4: {
    name: 'Gaming Legends',
    description: 'Connect with gamers around the world',
    features: [
      'Live gaming sessions',
      'Tips and tricks',
      'Gaming tournaments',
      'Game of the month voting',
      'Exclusive behind-the-scenes content',
      'Group play sessions with members',
    ],
    members: [
      { id: 7, name: 'Chris Green', profilePic: 'https://via.placeholder.com/50' },
      { id: 8, name: 'Sara Blue', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  5: {
    name: 'Cooking Masters',
    description: 'Swap recipes and share cooking tips',
    features: [
      'Recipe sharing',
      'Live cooking demos',
      'Monthly challenges',
      'Weekly recipe spotlights',
      'Cooking tips from professionals',
      'Ingredient swap ideas',
    ],
    members: [
      { id: 9, name: 'Alice Chef', profilePic: 'https://via.placeholder.com/50' },
      { id: 10, name: 'Chef Leo', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  6: {
    name: 'DIY Crafters',
    description: 'Unleash your creativity with DIY projects',
    features: [
      'Step-by-step tutorials',
      'Community project ideas',
      'Monthly contests',
      'Crafting resource library',
      'Live crafting sessions',
      'Seasonal project ideas',
    ],
    members: [
      { id: 11, name: 'DIY Master', profilePic: 'https://via.placeholder.com/50' },
      { id: 12, name: 'Crafty Emily', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  7: {
    name: 'Travel Buddies',
    description: 'Plan trips and share travel experiences',
    features: [
      'Travel guides',
      'Trip planning',
      'Photo sharing',
      'Destination reviews from members',
      'Travel budget planning',
      'Local travel tips and hacks',
    ],
    members: [
      { id: 13, name: 'Nomad Jack', profilePic: 'https://via.placeholder.com/50' },
      { id: 14, name: 'Wanderlust Mia', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  8: {
    name: 'Music Lovers',
    description: 'Discuss your favorite bands and songs',
    features: [
      'Music recommendations',
      'Live jam sessions',
      'Exclusive playlists',
      'Virtual concerts with members',
      'Music news and releases',
      'Weekly music challenges',
    ],
    members: [
      { id: 15, name: 'Rockstar Rick', profilePic: 'https://via.placeholder.com/50' },
      { id: 16, name: 'Jazz Jess', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
  9: {
    name: 'Pet Parents',
    description: 'Share stories and tips about pet care',
    features: [
      'Pet care tips',
      'Funny pet stories',
      'Pet adoption discussions',
      'Member pet of the week',
      'Pet product reviews',
      'Weekly pet health advice',
    ],
    members: [
      { id: 17, name: 'Dog Lover Dan', profilePic: 'https://via.placeholder.com/50' },
      { id: 18, name: 'Cat Mom Carla', profilePic: 'https://via.placeholder.com/50' },
    ],
  },
};

function GroupDetails() {
  const { id } = useParams();
  const [groupDetails, setGroupDetails] = useState({});
  const [isMember, setIsMember] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState({}); // To store comments for each post

  useEffect(() => {
    if (groupsData[id]) {
      setGroupDetails(groupsData[id]);
    } else {
      setGroupDetails({ name: 'Group Not Found', description: 'No details available.' });
    }
  }, [id]);

  const handleJoinGroup = () => setIsMember(true);

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (postId, comment) => {
    if (!comment.trim()) return; // Avoid empty comments
    const updatedComments = { ...comments, [postId]: [...(comments[postId] || []), comment] };
    setComments(updatedComments);
  };
  

  const handlePostSubmit = () => {
    if (newPost.trim() || image) {
      setPosts([
        ...posts,
        { id: posts.length + 1, content: newPost, likes: 0, image: image, comments: [] },
      ]);
      setNewPost('');
      setImage(null); // Reset image after post
    }
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0])); // Handle file upload and preview
  };

  return (
    <div className="group-details">
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

      {groupDetails.features && (
        <div className="group-features">
          <h2>Group Features</h2>
          <ul>
            {groupDetails.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="post-options">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handlePostSubmit}>Post</button>
      </div>

      <div className="group-posts">
        <h2>Recent Posts</h2>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-header">
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Post media" className="post-image" />}
            </div>

            <div className="post-actions">
              <button className="like-button" onClick={() => handleLikePost(post.id)}>
                👍 Like {post.likes}
              </button>
            </div>

            <div className="post-comments">
              <input
                type="text"
                placeholder="Add a comment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleCommentSubmit(post.id, e.target.value);
                    e.target.value = ''; // Clear input
                  }
                }}
              />
              <div className="comments-list">
                {comments[post.id]?.map((comment, index) => (
                  <div key={index} className="comment">
                    <p>{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isMember && groupDetails.members && (
        <div className="group-members">
          <h2>Group Members</h2>
          <div className="members-list">
            {groupDetails.members.map((member) => (
              <div key={member.id} className="member-card">
                <img src={member.profilePic} alt={member.name} className="member-pic" />
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupDetails;
