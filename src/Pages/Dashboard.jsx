import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});

  useEffect(() => {
    axios.get('https://aai-stock-backend-5fs3.onrender.com/api/products')
      .then(res => {
        console.log("✅ Products fetched:", res.data);
        setProducts(res.data);
      })
      .catch(err => console.error('❌ Fetch error:', err));
  }, []);

  const handleSearch = (field, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [field]: value.toLowerCase()
    }));
  };

  const handleClearFilters = () => {
    setColumnFilters({});
  };

  const filteredProducts = products.filter(item =>
    Object.keys(columnFilters).every(field =>
      (item[field] || '').toLowerCase().includes(columnFilters[field])
    )
  );

  const handleExportCSV = () => {
    const header = [
      "Install Date", "Supplied By", "Supply Order No", "Asset ID",
      "Make", "Model", "Serial No", "Location", "Department", "Remarks", "ITEM"
    ];

    const rows = filteredProducts.map(item => [
      item.installDate || '-',
      item.suppliedBy || '-',
      item.supplyOrderNo || '-',
      item.assetId || '-',
      item.make || '-',
      item.model || '-',
      item.serialNumber || '-',
      item.location || '-',
      item.department || '-',
      item.remarks || '-',
      item.item || '-'
    ]);

    const csvContent = [header, ...rows]
      .map(row => row.map(val => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stock_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100vw', overflowX: 'auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Stock Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={handleExportCSV}>Export CSV</button>
          <button onClick={handleClearFilters} className="clear-filter-btn">Clear Filters</button>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table className="dashboard-table" style={{ width: '100%', minWidth: '1200px' }}>
          <thead>
            <tr>
              <th>Install Date</th>
              <th>Supplied By</th>
              <th>Supply Order No</th>
              <th>Asset ID</th>
              <th>Make</th>
              <th>Model</th>
              <th>Serial No</th>
              <th>Location</th>
              <th>Department</th>
              <th>Remarks</th>
              <th>Item</th>
            </tr>
            <tr>
              {[
                'installDate', 'suppliedBy', 'supplyOrderNo', 'assetId',
                'make', 'model', 'serialNumber', 'location',
                'department', 'remarks', 'item'
              ].map((field, index) => (
                <th key={index}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={columnFilters[field] || ''}
                    onChange={(e) => handleSearch(field, e.target.value)}
                    className="column-filter"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <tr key={index}>
                  <td>{item.installDate || '-'}</td>
                  <td>{item.suppliedBy || '-'}</td>
                  <td>{item.supplyOrderNo || '-'}</td>
                  <td>{item.assetId || '-'}</td>
                  <td>{item.make || '-'}</td>
                  <td>{item.model || '-'}</td>
                  <td>{item.serialNumber || '-'}</td>
                  <td>{item.location || '-'}</td>
                  <td>{item.department || '-'}</td>
                  <td>{item.remarks || '-'}</td>
                  <td>{item.item || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '50px' }}>
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
