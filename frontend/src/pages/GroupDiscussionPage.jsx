import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GroupDiscussionPage.css";

const GroupDiscussionPage = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const response = await axios.get(`/api/groups/${groupId}`);
                setGroup(response.data.group);
                setPosts(response.data.posts);
            } catch (error) {
                console.error("Error fetching group data:", error);
            }
        };

        fetchGroupData();
    }, [groupId]);

    const handleNewPost = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `/api/groups/${groupId}/posts`,
                { content: newPost },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPosts((prevPosts) => [response.data, ...prevPosts]);
            setNewPost("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="discussion-page">
            {group && (
                <>
                    <h1>{group.name} Discussion Group</h1>
                    <p>{group.description}</p>
                </>
            )}

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
                {posts.map((post) => (
                    <div key={post._id} className="post">
                        <h3>{post.user.name}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupDiscussionPage;
