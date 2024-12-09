import axios from 'axios';

const API_URL = 'https://hobbyconnect-1.onrender.com/api';

// Register User
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/users/register`, userData);
};

// Login User
export const loginUser = async (userData) => {
  try {
    console.log("Sending login request with data:", userData);
    const response = await axios.post(`${API_URL}/users/login`, userData);
    console.log("Login API Response:", response); // Log the entire response
    return response.data; // Ensure this returns `{ token }`
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error;
  }
};


// Get User Profile
export const getUserProfile = async (token) => {
  try {
    console.log("api", token);
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure "Bearer " is prefixed to the token
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};

// Update User Hobbies
export const updateUserHobbies = async (token, hobbies) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/update-hobbies`,
      { hobbies }, // Pass hobbies as a body parameter
      {
        headers: {
          Authorization: `Bearer ${token}`, // Auth token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating hobbies:", error.response?.data || error.message);
    throw error;
  }
};

// Update User Profile
export const updateUserProfile = async (token, profileData) => {
    try {
        console.log("api", token);
        console.log("profileData", profileData);
       // console.log(JSON.stringify(profileData));
      const response = await axios.put(
        `${API_URL}/users/profile`,
        profileData, // Pass the updated profile data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Auth token
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      throw error;
    }
  };
  

// Get Hobby Recommendations
export const getHobbyRecommendations = async () => {
  try {
    const response = await axios.get(`${API_URL}/hobbies/recommendations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hobby recommendations:", error.response?.data || error.message);
    throw error;
  }
};


// Create a new group
export const createGroup = async (token, groupData) => {
  try {
      const response = await axios.post(`${API_URL}/groups`, groupData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Error creating group:", error.response?.data || error.message);
      throw error;
  }
};
