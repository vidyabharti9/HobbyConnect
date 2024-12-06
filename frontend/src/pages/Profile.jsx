import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, getHobbyRecommendations, createGroup } from "../services/api";
import "./Profile.css"
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});
    const [newGroup, setNewGroup] = useState({
        name: '',
        description: '',
        hobby: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to view your profile.");
                return;
            }
            try {
                const data = await getUserProfile(token);
                setUser(data);
                console.log(data.profilePicture);
                setForm({
                    name: data.name,
                    email: data.email,
                    hobbies: data.hobbies.join(", "), // Join hobbies for edit input
                });
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data || error.message);
                alert("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGroupChange = (e) => {
        setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to update your profile.");
            return;
        }
    
        try {
            const updatedUser = await updateUserProfile(token, { 
                ...form,
                hobbies: form.hobbies.split(",").map((hobby) => hobby.trim()), 
            });
            setUser(updatedUser);
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
            alert("Failed to update profile");
        }
    };

    const handleCreateGroup = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to create a group.");
            return;
        }

        try {
            const response = await createGroup(token, newGroup);
            alert("Group created successfully!");
            console.log(response);
            setNewGroup({ name: '', description: '', hobby: '' }); // Reset form
        } catch (error) {
            console.error("Error creating group:", error);
            alert("Failed to create group");
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!user) return <div>No user data available</div>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>

            {/* Display Profile Picture */}
            {user.profilePicture && (
                <div>
                    <h2>Profile Picture:</h2>
                    <img
                        src={`http://localhost:5000/${user.profilePicture}`}
                        alt="Profile"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>
            )}

            {!editing ? (
                <>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Hobbies:</strong> {user.hobbies?.join(", ") || "No hobbies listed"}</p>
                    <p><strong>Achievements:</strong></p>
                    <ul>
                        {user.achievements?.length
                            ? user.achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                        ))
                            : "No achievements yet"}
                    </ul>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </>
            ) : (
                <form>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <textarea
                        name="hobbies"
                        value={form.hobbies}
                        onChange={handleInputChange}
                        placeholder="Hobbies (comma-separated)"
                    />
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                </form>
            )}

            <h2>Create a New Group</h2>
            <form>
                <input
                    type="text"
                    name="name"
                    value={newGroup.name}
                    onChange={handleGroupChange}
                    placeholder="Group Name"
                />
                <textarea
                    name="description"
                    value={newGroup.description}
                    onChange={handleGroupChange}
                    placeholder="Group Description"
                />
                <input
                    type="text"
                    name="hobby"
                    value={newGroup.hobby}
                    onChange={handleGroupChange}
                    placeholder="Hobby"
                />
                <button type="button" onClick={handleCreateGroup}>Create Group</button>
            </form>
        </div>
    );
};

export default Profile;
