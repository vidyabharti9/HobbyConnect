import { useState, useEffect } from "react";
import { getHobbyRecommendations } from "../services/api";

const HobbyRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getHobbyRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Hobbies</h2>
      <ul>
        {recommendations.map((hobby) => (
          <li key={hobby._id}>{hobby.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HobbyRecommendations;
