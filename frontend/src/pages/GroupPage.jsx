import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GroupPage.css";

const GroupPage = () => {
    const { hobby } = useParams(); // Get the hobby parameter from the route
    const [group, setGroup] = useState(null); // Store group details
    const [posts, setPosts] = useState([]); // Store posts
    const [newPost, setNewPost] = useState("");
    const [joined, setJoined] = useState(false); // Track if user has joined
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [comment, setComment] = useState("");
    const [expandedPosts, setExpandedPosts] = useState({});



    // Helper: Get Authorization Headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        return { Authorization: `Bearer ${token}` };
    };
    const toggleComments = (postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId], // Toggle the expanded state
        }));
    };
    

    useEffect(() => {
        const fetchGroupData = async () => {
            setLoading(true);
            try {
                // Fetch group details by hobby
                const { data } = await axios.get(`http://localhost:5000/api/groups/${hobby}`);
                setGroup(data.group);

                const token = localStorage.getItem("token");
                if (token) {
                    // Check membership status
                    const membershipResponse = await axios.get(
                        `http://localhost:5000/api/groups/${data.group._id}/membership`,
                        { headers: getAuthHeaders() }
                    );
                    setJoined(membershipResponse.data.isMember);

                    if (membershipResponse.data.isMember) {
                        const postsResponse = await axios.get(
                            `http://localhost:5000/api/groups/${data.group._id}/posts`,
                            { headers: getAuthHeaders() }
                        );
                        setPosts(postsResponse.data);
                    }
                }
            } catch (err) {
                console.error("Error fetching group data:", err);
                setError(err.response?.data?.message || "Failed to load group details");
            } finally {
                setLoading(false);
            }
        };

        fetchGroupData();
    }, [hobby]);

    const handleJoinGroup = async () => {
        try {
            const headers = getAuthHeaders();
            if (!headers) {
                alert("Please log in to join the group.");
                return;
            }

            await axios.post(
                `http://localhost:5000/api/groups/${group.name}/join`,
                {},
                { headers }
            );

            setJoined(true);

            // Fetch posts after joining
            const postsResponse = await axios.get(
                `http://localhost:5000/api/groups/${group._id}/posts`,
                { headers }
            );
            setPosts(postsResponse.data);
        } catch (err) {
            console.error("Error joining group:", err);
            alert(err.response?.data?.message || "Unable to join the group");
        }
    };

    const handleNewPost = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to post.");
                return;
            }
    
            const response = await axios.post(
                `http://localhost:5000/api/groups/${group._id}/posts`, // Use group._id
                { content: newPost },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // Update posts state with the newly created post
            setPosts((prevPosts) => [response.data, ...prevPosts]);
            setNewPost("");
        } catch (err) {
            console.error("Error creating post:", err);
            alert(err.response?.data?.message || "Unable to create the post. Please try again.");
        }
    };

    const handleAddComment = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to comment");
                return;
            }
    
            // Send a request to the backend to create a new comment
            const response = await axios.post(
                `http://localhost:5000/api/groups/${group._id}/posts/${postId}/comments`,
                { comment_text: comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // Add the new comment to the post's comment list
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, comments: [...post.comments, response.data] } : post
                )
            );
    
            // Clear the comment input field
            setComment("");
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Unable to add the comment. Please try again.");
        }
    };
    
    

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    if (!group) return <div>Group not found</div>;

    return (
        <div className="group-page">
            {!joined ? (
                <div className="group-details">
                    <h1>{group.name}</h1>
                    <p>{group.description}</p>
                    <button onClick={handleJoinGroup}>Join Group</button>
                </div>
            ) : (
                <div className="discussion-panel">
                    <h1>{group.name} Discussion Group</h1>
                    <p>{group.description}</p>

                    <div className="new-post">
                        <textarea
                            placeholder="Share something..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                        ></textarea>
                        <button onClick={handleNewPost}>Post</button>
                    </div>

                    <div className="posts">
    <h2>Posts</h2>
    {posts.length > 0 ? (
        posts.map((post) => (
            <div key={post._id} className="post">
                <div className="post-header">
                    <h3>{post.user?.name || "Unknown User"}</h3>
                </div>
                <div className="post-content">
                    <p>{post.content}</p>
                </div>
                <div className="post-footer">
    {post.comments && post.comments.length > 0 ? (
        <div className="comments-preview">
            {expandedPosts[post._id] ? (
                // Show all comments
                post.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <p>
                            <strong>{comment.user?.name || "Unknown User"}:</strong> {comment.comment_text}
                        </p>
                    </div>
                ))
            ) : (
                // Show only the first 2 comments
                post.comments.slice(0, 2).map((comment) => (
                    <div key={comment._id} className="comment">
                        <p>
                            <strong>{comment.user?.name || "Unknown User"}:</strong> {comment.comment_text}
                        </p>
                    </div>
                ))
            )}
            {/* Toggle button */}
            {post.comments.length > 2 && (
                <button onClick={() => toggleComments(post._id)}>
                    {expandedPosts[post._id] ? "Hide Comments" : `View all ${post.comments.length} comments`}
                </button>
            )}
        </div>
    ) : (
        <p className="no-comments">No comments yet.</p>
    )}
</div>

                {/* Add a new comment */}
                <div className="add-comment">
                    <textarea
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button onClick={() => handleAddComment(post._id)}>Post Comment</button>
                </div>
            </div>
        ))
    ) : (
        <p>No posts yet.</p>
    )}
</div>

                </div>
            )}
        </div>
    );
};

export default GroupPage;
