// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Profile.css";

const Profile = () => {
  const [storedProfile, setStoredProfile] = useLocalStorage("userData", null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    bio: "",
    joined: "",
    coursesCompleted: 0,
    totalHours: 0,
  });

  const [editing, setEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize from localStorage or defaults
  useEffect(() => {
    if (storedProfile) {
      setFormData(storedProfile);
      setOriginalData(storedProfile);
    } else {
      const defaultData = {
        name: "Kavi Sandilya",
        email: "kavi@example.com",
        phone: "+91 9876543210",
        role: "B.Tech Student",
        bio: "Computer Science student exploring full-stack development and sustainable tech.",
        joined: new Date().toLocaleDateString(),
        coursesCompleted: 12,
        totalHours: 156,
      };
      setFormData(defaultData);
      setOriginalData(defaultData);
      setStoredProfile(defaultData);
    }
  }, [storedProfile, setStoredProfile]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = () => {
    setOriginalData(formData);
    setEditing(true);
  };

  const cancelEditing = () => {
    setFormData(originalData);
    setEditing(false);
  };

  const saveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setStoredProfile(formData);
      setEditing(false);
      setIsSaving(false);
    }, 800);
  };

  const isDirty = JSON.stringify(formData) !== JSON.stringify(originalData);

  const initials =
    formData.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "KS";

  return (
    <div className="profile-page">
      {/* Header */}
      <section className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-ring">
            <span className="avatar-initials">{initials}</span>
          </div>
        </div>
        <div className="profile-info">
          <h1>{formData.name}</h1>
          <p className="profile-role">{formData.role}</p>
          <p className="profile-bio">{formData.bio}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="profile-stats">
        <div className="profile-stat">
          <div className="profile-stat-number">
            {formData.coursesCompleted}
          </div>
          <div className="profile-stat-label">Courses Completed</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-number">{formData.totalHours}h</div>
          <div className="profile-stat-label">Total Study Time</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-number">
            {formData.joined || "-"}
          </div>
          <div className="profile-stat-label">Joined</div>
        </div>
      </section>

      {/* Form card */}
      <section className="profile-form-card">
        <div className="profile-form-header">
          <h2>{editing ? "Edit Profile" : "Profile Details"}</h2>
          <div className="profile-form-actions">
            {!editing ? (
              <button className="btn-outline" onClick={startEditing}>
                ✏️ Edit
              </button>
            ) : (
              <>
                <button
                  className="btn-primary"
                  onClick={saveProfile}
                  disabled={!isDirty || isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="btn-secondary"
                  onClick={cancelEditing}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="profile-form-body">
          <div className="profile-form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              className="profile-input"
              value={formData.name}
              onChange={onChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="profile-input"
              value={formData.email}
              onChange={onChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              className="profile-input"
              value={formData.phone}
              onChange={onChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              name="role"
              className="profile-input"
              value={formData.role}
              onChange={onChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-form-group full">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="profile-textarea"
              value={formData.bio}
              onChange={onChange}
              disabled={!editing}
            />
          </div>
        </div>

        {editing && isDirty && (
          <div className="profile-changes-notice">
            🔸 You have unsaved changes
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
