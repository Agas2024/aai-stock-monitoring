// src/users.js
export let users = {
  jeni: "IT@123",
  bharathi_raja: "IT@123",
  vinoth: "IT@123",
  sarasu: "IT@123"
};

// Allow dynamic updates
export const updateUserPassword = (username, newPassword) => {
  users[username.toLowerCase()] = newPassword;
};

export const addUsername = (newUsername) => {
  users[newUsername.toLowerCase()] = "IT@123";
};
