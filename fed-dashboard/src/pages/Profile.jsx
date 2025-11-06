import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [editing, setEditing] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUserData(storedUser);
    } else {
      setUserData({
        name: "Kavi Sandilya",
        email: "kavi@example.com",
        phone: "+91 9876543210",
        role: "Student",
      });
    }
  }, []);

  // Save updated data
  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setEditing(false);
    alert("Profile updated successfully ✅");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <label>Name:</label>
        <input
          name="name"
          value={userData.name}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>Email:</label>
        <input
          name="email"
          value={userData.email}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>Phone:</label>
        <input
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>Role:</label>
        <input
          name="role"
          value={userData.role}
          onChange={handleChange}
          disabled={!editing}
        />

        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default Profile;