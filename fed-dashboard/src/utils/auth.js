// src/utils/auth.js

// Register a new user and store in localStorage
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
      password, // For production, hash this.
      createdAt: new Date().toISOString(),
    };

    // Persist main account data
    localStorage.setItem("userAccount", JSON.stringify(newUser));
    // Mark authenticated
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAuthenticated", "true");

    // Lightweight display info for dashboard
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

// Login with username + password
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

// Logout: keep account, only clear session flags + current user
export const logoutUser = () => {
  try {
    const keysToRemove = [
      "isLoggedIn",
      "isAuthenticated",
      "user",
      "userData",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    // DO NOT remove "userAccount" so signup persists
    return { success: true };
  } catch (err) {
    console.error("logoutUser error:", err);
    return { success: false };
  }
};

// Check whether user is authenticated
export const isAuthenticated = () => {
  return (
    localStorage.getItem("isLoggedIn") === "true" ||
    localStorage.getItem("isAuthenticated") === "true"
  );
};

// Get current display user (for header/dashboard)
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

// Optional: update profile (used by Profile page)
export const updateUserProfile = (profileData) => {
  try {
    const account = JSON.parse(localStorage.getItem("userAccount") || "null");
    if (!account) {
      return { success: false, message: "No user found." };
    }

    const updatedAccount = {
      ...account,
      username: profileData.name || account.username,
      email: profileData.email || account.email,
    };

    localStorage.setItem("userAccount", JSON.stringify(updatedAccount));
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: updatedAccount.username,
        email: updatedAccount.email,
      })
    );
    localStorage.setItem("userData", JSON.stringify(profileData));

    return { success: true, message: "Profile updated." };
  } catch (err) {
    console.error("updateUserProfile error:", err);
    return { success: false, message: "Profile update failed." };
  }
};
