import React, { useState } from 'react';
import axios from 'axios';
import './FormPage.css';
import logo from '../assets/aai-logo.png';
import { useNavigate } from 'react-router-dom';

export default function NewItem() {
  const [form, setForm] = useState({
    installDate: '',
    suppliedBy: '',
    supplyOrderNo: '',
    assetId: '',
    make: '',
    model: '',
    serialNumber: '',
    location: '',
    Department: '',
    remarks: '',
    ITEM: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form);
      alert('✅ Product added successfully!');
      setForm({
        installDate: '',
        suppliedBy: '',
        supplyOrderNo: '',
        assetId: '',
        make: '',
        model: '',
        serialNumber: '',
        location: '',
        Department: '',
        remarks: '',
        ITEM: ''
      });
    } catch (err) {
      if (err.response?.status === 400) {
        alert(err.response.data.error || '❌ Asset ID already exists!');
      } else {
        console.error('❌ Error submitting product:', err);
        alert('❌ Failed to add product item');
      }
    }
  };

  return (
    <div className="form-page">
      {/* Top-right buttons */}
      <div className="top-right-buttons">
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/product-update')}>Product Update</button>
      </div>

      <div className="watermark">
        <img src={logo} alt="AAI Logo" />
      </div>

      <div className="form-container">
        <h2>New Item Entry</h2>
        <form onSubmit={handleSubmit}>
          <input type="date" name="installDate" placeholder="Install Date" value={form.installDate} onChange={handleChange} required />
          <input type="text" name="suppliedBy" placeholder="Supplied By" value={form.suppliedBy} onChange={handleChange} required />
          <input type="text" name="supplyOrderNo" placeholder="Supply Order No" value={form.supplyOrderNo} onChange={handleChange} required />
          <input type="text" name="assetId" placeholder="Asset ID" value={form.assetId} onChange={handleChange} required />
          <input type="text" name="make" placeholder="Make" value={form.make} onChange={handleChange} required />
          <input type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
          <input type="text" name="serialNumber" placeholder="Serial Number" value={form.serialNumber} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input type="text" name="Department" placeholder="Department" value={form.Department} onChange={handleChange} required />
          <input type="text" name="remarks" placeholder="Remarks" value={form.remarks} onChange={handleChange} />
          <input type="text" name="ITEM" placeholder="Item" value={form.ITEM} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
