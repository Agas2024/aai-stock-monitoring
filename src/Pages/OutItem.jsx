import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OutItem.css';
import logo from '../assets/aai-logo.png';
import axios from 'axios';

export default function OutItem() {
  const [form, setForm] = useState({
    assetId: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://aai-stock-backend.onrender.com/api/out-item', form);
      alert(res.data.message);
      setForm({ assetId: '' });
    } catch (err) {
      console.error('❌ Error:', err);
      alert('❌ Failed to process out item');
    }
  };

  return (
    <div className="out-item-page">
      {/* Dashboard Button */}
      <div className="top-right-button">
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>

      {/* Watermark Logo */}
      <div className="watermark">
        <img src={logo} alt="AAI Logo" />
      </div>

      {/* Form */}
      <div className="out-item-box">
        <h2>Out Item Update</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="assetId"
            placeholder="Asset ID"
            value={form.assetId}
            onChange={handleChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
