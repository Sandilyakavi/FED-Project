// src/utils/auth.js

export const loginUser = (email, password) => {
  // ✅ Simple fake login for demo
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return { success: false, message: "No account found. Please sign up first." };
  }

  if (storedUser.email === email && storedUser.password === password) {
    localStorage.setItem("isAuthenticated", "true");
    return { success: true, message: "Login successful!" };
  } else {
    return { success: false, message: "Invalid credentials." };
  }
};

export const registerUser = (name, email, password) => {
  // ✅ Prevent duplicate signup
  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (existingUser && existingUser.email === email) {
    return { success: false, message: "Email already registered." };
  }

  const newUser = { name, email, password };
  localStorage.setItem("user", JSON.stringify(newUser));
  localStorage.setItem("isAuthenticated", "true");
  return { success: true, message: "Registration successful!" };
};

export const logoutUser = () => {
  localStorage.removeItem("isAuthenticated");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};
