import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function ProductUpdateTable() {
  const [products, setProducts] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  useEffect(() => {
    axios.get('https://aai-stock-backend-5fs3.onrender.com/api/products')
      .then(res => setProducts(res.data))
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

  const handleEdit = (row) => {
    setEditingRow(row.assetId);
    setEditedRow({ ...row });
  };

  const handleInputChange = (field, value) => {
    setEditedRow(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedRow({});
  };

  const handleSave = (originalAssetId) => {
    axios.put('https://aai-stock-backend.onrender.com/api/update-product', {
      ...editedRow,
      originalAssetId
    })
      .then(() => {
        const updatedProducts = [...products];
        const index = updatedProducts.findIndex(p => p.assetId === originalAssetId);
        if (index !== -1) {
          updatedProducts[index] = { ...updatedProducts[index], ...editedRow };
          setProducts(updatedProducts);
        }
        setEditingRow(null);
        setEditedRow({});
        alert('✅ Product updated successfully');
      })
      .catch((err) => {
        console.error('❌ Update failed:', err);
        alert('❌ Failed to update product');
      });
  };

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
    link.download = "product_update.csv";
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
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Update Products</h2>
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
              <th>Actions</th>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <tr key={index}>
                  {[
                    'installDate', 'suppliedBy', 'supplyOrderNo', 'assetId',
                    'make', 'model', 'serialNumber', 'location',
                    'department', 'remarks', 'item'
                  ].map((field, i) => (
                    <td key={i}>
                      {editingRow === item.assetId ? (
                        <input
                          type="text"
                          value={editedRow[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                        />
                      ) : (
                        item[field] || '-'
                      )}
                    </td>
                  ))}
                  <td>
                    {editingRow === item.assetId ? (
                      <>
                        <button onClick={() => handleSave(item.assetId)}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: 'center', padding: '50px' }}>
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
