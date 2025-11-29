// src/utils/auth.js

// Register a new user and store in an array `userAccounts`
export const registerUser = (username, email, password) => {
  try {
    const raw = localStorage.getItem("userAccounts");
    const existingList = raw ? JSON.parse(raw) : [];

    // Check if username or email already exists
    const exists = existingList.find(
      (u) => u.username === username || u.email === email
    );
    if (exists) {
      return {
        success: false,
        message: "Account already exists with this username or email.",
      };
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password, // For real apps: hash this.
      createdAt: new Date().toISOString(),
    };

    const updatedList = [...existingList, newUser];
    localStorage.setItem("userAccounts", JSON.stringify(updatedList));

    // Mark new user as logged in
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAuthenticated", "true");

    // Current session user
    localStorage.setItem(
      "user",
      JSON.stringify({ name: username, email })
    );
    localStorage.setItem("userAccount", JSON.stringify(newUser)); // convenience: last used account

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

// Login existing user from `userAccounts`
export const loginUser = (username, password) => {
  try {
    const raw = localStorage.getItem("userAccounts");
    const accounts = raw ? JSON.parse(raw) : [];

    if (!accounts.length) {
      return {
        success: false,
        message: "No account found. Please create one first.",
      };
    }

    const user = accounts.find((u) => u.username === username);

    if (!user || user.password !== password) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAuthenticated", "true");

    localStorage.setItem(
      "user",
      JSON.stringify({ name: user.username, email: user.email })
    );
    localStorage.setItem("userAccount", JSON.stringify(user));

    return {
      success: true,
      message: "Login successful!",
      user: { name: user.username, email: user.email },
    };
  } catch (err) {
    console.error("loginUser error:", err);
    return {
      success: false,
      message: "Login failed. Please try again.",
    };
  }
};

// Logout: clear session data but keep all accounts in `userAccounts`
export const logoutUser = () => {
  try {
    const keysToRemove = [
      "isLoggedIn",
      "isAuthenticated",
      "user",
      "userData",
      "userAccount",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    // Do NOT remove "userAccounts" so all registered users stay saved
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

// Get current display user (for dashboard, header, etc.)
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

// Optional: update profile data and sync with current account
export const updateUserProfile = (profileData) => {
  try {
    const raw = localStorage.getItem("userAccounts");
    const accounts = raw ? JSON.parse(raw) : [];
    const current = JSON.parse(localStorage.getItem("userAccount") || "null");

    if (!current) {
      return { success: false, message: "No user found." };
    }

    const updatedAccounts = accounts.map((acc) =>
      acc.username === current.username
        ? {
            ...acc,
            username: profileData.name || acc.username,
            email: profileData.email || acc.email,
          }
        : acc
    );

    const updatedAccount = updatedAccounts.find(
      (acc) => acc.username === (profileData.name || current.username)
    );

    localStorage.setItem("userAccounts", JSON.stringify(updatedAccounts));
    if (updatedAccount) {
      localStorage.setItem("userAccount", JSON.stringify(updatedAccount));
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: updatedAccount.username,
          email: updatedAccount.email,
        })
      );
    }

    // store full profile separately (key can be userData_username on Profile side)
    localStorage.setItem("userData", JSON.stringify(profileData));

    return { success: true, message: "Profile updated." };
  } catch (err) {
    console.error("updateUserProfile error:", err);
    return { success: false, message: "Profile update failed." };
  }
};
