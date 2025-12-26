import React, { useState } from 'react';
import './FormPage.css';
import logo from '../assets/aai-logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OldItem() {
  const [form, setForm] = useState({
    assetId: '',
    make: '',
    ITEM: '',
    remarks: ''
  });

  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://aai-stock-backend-5fs3.onrender.com/api/old-item', form);
      setPopupMessage(res.data.message);
      setPopupType('success');
      setForm({
        assetId: '',
        make: '',
        ITEM: '',
        remarks: ''
      });
    } catch (err) {
      if (err.response?.status === 409) {
        setPopupMessage('❌ Asset ID already exists');
        setPopupType('error');
      } else {
        setPopupMessage('❌ Asset ID already exists');
        setPopupType('error');
      }
    }

    // Auto clear popup after 3 seconds
    setTimeout(() => {
      setPopupMessage('');
      setPopupType('');
    }, 3000);
  };

  return (
    <div className="form-page">
      {/* Dashboard Button */}
      <div className="top-right-button">
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>

      <div className="watermark">
        <img src={logo} alt="AAI Logo" />
      </div>

      <div className="form-container">
        <h2>Old Item Entry</h2>

        {/* ✅ Popup Message */}
        {popupMessage && (
          <div className={`popup-message ${popupType}`}>
            {popupMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="assetId"
            placeholder="Asset ID"
            value={form.assetId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="make"
            placeholder="Make"
            value={form.make}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ITEM"
            placeholder="Item"
            value={form.ITEM}
            onChange={handleChange}
            required
          />
          <select
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            required
          >
            <option value="">Select Remarks</option>
            <option value="WORKING">WORKING</option>
            <option value="NOT WORKING">NOT WORKING</option>
            <option value="TO BE SERVICED">TO BE SERVICED</option>
            <option value="SCRAPE">SCRAPE</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
