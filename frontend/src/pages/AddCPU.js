import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCPU = () => {
  const [form, setForm] = useState({
    purchasedFrom: 'Institute NIFS', // ✅ First field
    makeModel: '',
    type: '',
    inventoryNumber: '',
    serialNumber: '',
    location: '',
    processorSpeed: '',
    ram: '',
    hdd: '',
    os: '',
    totalCost: '',
    maintainedBy: '',
    warranty: '',
    importantInfo: '',
    purchaseDate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/cpus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success('✅ CPU added successfully!');
        setForm({
          purchasedFrom: 'Institute NIFS', // ✅ Reset back
          makeModel: '',
          type: '',
          inventoryNumber: '',
          serialNumber: '',
          location: '',
          processorSpeed: '',
          ram: '',
          hdd: '',
          os: '',
          totalCost: '',
          maintainedBy: '',
          warranty: '',
          importantInfo: '',
          purchaseDate: ''
        });
      } else {
        toast.error('❌ Failed to add CPU.');
      }
    } catch (error) {
      console.error(error);
      toast.error('❌ An error occurred.');
    }
  };

  const renderInput = (label, name, type = 'text', required = false) => (
    <div style={rowStyle}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        required={required}
        style={inputStyle}
      />
    </div>
  );

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add CPU Details</h2>
      <form onSubmit={handleSubmit}>
        {renderInput("Purchased/Transferred From", "purchasedFrom", "text", true)} {/* ✅ First */}
        {renderInput("Make & Model", "makeModel", "text", true)}
        {renderInput("Type", "type", "text", true)}
        {renderInput("Inventory Number", "inventoryNumber", "text", true)}
        {renderInput("Serial Number", "serialNumber", "text", true)}
        {renderInput("Location", "location", "text", true)}
        {renderInput("Processor Speed", "processorSpeed")}
        {renderInput("RAM", "ram")}
        {renderInput("Hard Disk Drive", "hdd")}
        {renderInput("Operating System", "os")}
        {renderInput("Total Cost", "totalCost", "text", true)}
        {renderInput("Maintained By", "maintainedBy", "text", true)}
        {renderInput("Warranty", "warranty", "text", true)}
        {renderInput("Important Info", "importantInfo")}
        {renderInput("Purchase Date", "purchaseDate", "date")}
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

// === Styles ===

const formContainerStyle = {
  padding: '5rem',
  maxWidth: '1000px',
  margin: 'auto',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  marginTop: '2rem'
};

const titleStyle = {
  marginBottom: '1rem',
  textAlign: 'center',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '12px',
};

const labelStyle = {
  minWidth: '150px',
  fontWeight: 'normal',
};

const inputStyle = {
  flex: '1',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#002855',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '1rem'
};

export default AddCPU;
