import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/forgot-password', {
        username,
        newPassword
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h3>Forgot Password</h3>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Reset Password</button>
      </div>
    </div>
  );
}
