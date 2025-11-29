// src/utils/auth.js

// Register a new user
export const registerUser = (username, email, password) => {
  try {
    const existing = JSON.parse(localStorage.getItem("userAccount") || "null");

    if (
      existing &&
      (existing.username === username || existing.email === email)
    ) {
      return {
        success: false,
        message: "Account already exists with this username or email.",
      };
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password, // For real apps, never store plain passwords.
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("userAccount", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAuthenticated", "true");

    // Display user data for dashboard
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: username,
        email,
      })
    );

    return {
      success: true,
      message: "Registration successful!",
      user: { name: username, email },
    };
  } catch (err) {
    console.error("registerUser error:", err);
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
};

// Login existing user
export const loginUser = (username, password) => {
  try {
    const stored = JSON.parse(localStorage.getItem("userAccount") || "null");

    if (!stored) {
      return {
        success: false,
        message: "No account found. Please create one first.",
      };
    }

    if (stored.username !== username || stored.password !== password) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAuthenticated", "true");

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: stored.username,
        email: stored.email,
      })
    );

    return {
      success: true,
      message: "Login successful!",
      user: { name: stored.username, email: stored.email },
    };
  } catch (err) {
    console.error("loginUser error:", err);
    return {
      success: false,
      message: "Login failed. Please try again.",
    };
  }
};

// Logout user
export const logoutUser = () => {
  try {
    // Remove only auth-related keys so course/project/task data can stay
    const keysToRemove = [
      "isLoggedIn",
      "isAuthenticated",
      "userAccount",
      "user",
      "userData",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    return { success: true };
  } catch (err) {
    console.error("logoutUser error:", err);
    return { success: false };
  }
};

// Check auth status
export const isAuthenticated = () => {
  return (
    localStorage.getItem("isLoggedIn") === "true" ||
    localStorage.getItem("isAuthenticated") === "true"
  );
};

// Get current user object
export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user;
  } catch {
    return null;
  }
};

// Update profile data (optional helper for Profile page)
export const updateUserProfile = (profileData) => {
  try {
    const stored = JSON.parse(localStorage.getItem("userAccount") || "null");
    if (!stored) {
      return { success: false, message: "No user found." };
    }

    const updated = {
      ...stored,
      username: profileData.name || stored.username,
      email: profileData.email || stored.email,
    };

    localStorage.setItem("userAccount", JSON.stringify(updated));
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: updated.username,
        email: updated.email,
      })
    );
    localStorage.setItem("userData", JSON.stringify(profileData));

    return { success: true, message: "Profile updated." };
  } catch (err) {
    console.error("updateUserProfile error:", err);
    return { success: false, message: "Profile update failed." };
  }
};
