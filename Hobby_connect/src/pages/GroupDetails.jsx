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
  const [comments, setComments] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (groupsData[id]) {
      setGroupDetails(groupsData[id]);
    } else {
      setGroupDetails({ name: 'Group Not Found', description: 'No details available.' });
    }
  }, [id]);

  const handleJoinGroup = () => setIsMember(true);

  const handlePostSubmit = () => {
    if (newPost.trim() || image) {
      setPosts([
        ...posts,
        { id: posts.length + 1, content: newPost, likes: 0, image: image, reactions: {}, comments: [] },
      ]);
      setNewPost('');
      setImage(null);
    }
  };

  const handleImageChange = (e) => setImage(URL.createObjectURL(e.target.files[0]));

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleReactToPost = (postId, reaction) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const reactions = { ...post.reactions };
        reactions[reaction] = (reactions[reaction] || 0) + 1;
        return { ...post, reactions };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery)
  );

  const handleCommentSubmit = (postId, comment) => {
    if (!comment.trim()) return;
    const updatedComments = { ...comments, [postId]: [...(comments[postId] || []), comment] };
    setComments(updatedComments);
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

      {isMember && (
        <>
          <div className="announcements">
            <h2>Announcements</h2>
            <p>Welcome to the group! Stay updated with our latest events and activities.</p>
          </div>

          <div className="group-features">
            <h2>Group Features</h2>
            <ul>
              {groupDetails.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="search-posts">
            <h2>Search Posts</h2>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

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
            {filteredPosts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <p>{post.content}</p>
                  {post.image && <img src={post.image} alt="Post media" className="post-image" />}
                </div>
                <div className="post-actions">
                  <button onClick={() => handleLikePost(post.id)}>👍 {post.likes}</button>
                  <div className="reactions">
                    {['❤️', '😆', '😮', '😢', '😡'].map((reaction) => (
                      <button
                        key={reaction}
                        onClick={() => handleReactToPost(post.id, reaction)}
                      >
                        {reaction} {post.reactions?.[reaction] || 0}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="post-comments">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleCommentSubmit(post.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="comments-list">
                    {comments[post.id]?.map((comment, index) => (
                      <p key={index}>{comment}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GroupDetails;