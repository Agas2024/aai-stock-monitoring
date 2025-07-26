import React, { useState } from 'react';
import axios from 'axios';

export default function ChangeUser() {
  const [oldUsername, setOldUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://aai-stock-backend.onrender.com/api/change-username', {
        oldUsername,
        newUsername
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Username change failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h3>Change Username</h3>
        <input
          type="text"
          placeholder="Current Username"
          value={oldUsername}
          onChange={(e) => setOldUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={handleSubmit}>Change Username</button>
      </div>
    </div>
  );
}

