// src/pages/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useAuth } from "../context/authContext"; // Ensure this import is correct
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Dashboard = () => {
  // Use the custom hook to get user and token
  const { user, token } = useAuth();

  // State variables for profile picture, user info, and hobby data
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newHobby, setNewHobby] = useState("");
  const [hobbies, setHobbies] = useState(["Photography", "Gaming", "Fitness"]);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef();

  // Effect to handle user info when 'user' state changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfilePic(user.profilePic || "");
    }
  }, [user]);

  // Handling profile picture upload
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/uploadProfilePic",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfilePic(response.data.profilePicUrl);
        alert("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  // Handle removing profile picture
  const handleRemoveProfilePic = () => {
    setProfilePic("");
  };

  // Handle cropping of the profile picture
  const handleCropComplete = async () => {
    if (imageRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg");
      setCroppedImage(base64Image);
    }
  };

  // Add a new hobby to the hobby list
  const handleAddHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby)) {
      setHobbies([...hobbies, newHobby]);
      setNewHobby("");
    }
  };

  // If user is not found or loading, display a loading message
  if (!user) {
    return <div>Loading your profile...</div>;
  }

  return (
    <div className="dashboard">
      <div className="profile-section">
        <div className="profile-pic-container">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="profile-avatar"
          />
          <input
            type="file"
            onChange={handleProfilePicUpload}
            accept="image/*"
          />
          {profilePic && (
            <button onClick={handleRemoveProfilePic}>Remove Profile Picture</button>
          )}
        </div>
        <div className="basic-info">
          <h1 className="user-name">{name}</h1>
          <p className="user-email">{email}</p>
        </div>
      </div>

      <div className="details-section">
        <div className="hobbies-section">
          <h2>Your Hobbies</h2>
          <ul className="hobby-list">
            {hobbies.map((hobby, index) => (
              <li key={index} className="hobby-item">
                {hobby}
              </li>
            ))}
          </ul>
          <div className="add-hobby-form">
            <input
              type="text"
              placeholder="Add a new hobby"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              className="hobby-input"
            />
            <button onClick={handleAddHobby} className="add-hobby-button">
              Add Hobby
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
