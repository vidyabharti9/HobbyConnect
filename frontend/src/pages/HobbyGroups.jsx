import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HobbyGroups.css";

const HobbyGroups = () => {
    const [groups, setGroups] = useState([]); // Store available groups
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    // Fetch groups from the backend on component mount
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/groups");
                setGroups(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch groups.");
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    if (loading) {
        return <div>Loading groups...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="hobby-groups">
            <h1>Explore Hobby Groups</h1>
            <p>Connect with others who share your passion.</p>
            <div className="hobby-grid">
                {groups.length > 0 ? (
                    groups.map((group) => (
                        <Link to={`/groups/${group._id}`} key={group._id} className="hobby-card">
                            <img src={group.image || "/images/default.jpg"} alt={group.name} />
                            <h2>{group.name}</h2>
                        </Link>
                    ))
                ) : (
                    <p>No groups available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default HobbyGroups;
