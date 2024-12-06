import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GroupDetailPage.css";

const GroupDetailPage = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [isMember, setIsMember] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await axios.get(`/api/groups/${groupId}`);
                setGroup(response.data.group);
                setIsMember(response.data.isMember); // Backend should return if the user is already a member
            } catch (error) {
                console.error("Error fetching group details:", error);
            }
        };

        fetchGroupDetails();
    }, [groupId]);

    const handleJoinGroup = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`/api/groups/${groupId}/join`, {}, { headers: { Authorization: `Bearer ${token}` } });
            setIsMember(true);
        } catch (error) {
            console.error("Error joining group:", error);
        }
    };

    const handleGoToDiscussion = () => {
        navigate(`/groups/${groupId}/discussion`);
    };

    return (
        <div className="group-detail-page">
            {group ? (
                <>
                    <h1>{group.name}</h1>
                    <p>{group.description}</p>
                    {!isMember ? (
                        <button onClick={handleJoinGroup}>Join Group</button>
                    ) : (
                        <button onClick={handleGoToDiscussion}>Go to Discussion</button>
                    )}
                </>
            ) : (
                <p>Loading group details...</p>
            )}
        </div>
    );
};

export default GroupDetailPage;
