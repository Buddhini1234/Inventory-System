import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSwitch = () => {
  const [form, setForm] = useState({
    purchasedFrom: 'Institute NIFS',
    inventoryNumber: '', // ✅ Added field
    equipment: '',
    makeModel: '',
    serialNo: '',
    noOfPorts: '',
    portStatusIndicators: '',
    transmissionModes: '',
    baudRates: '',
    negotiation: '',
    mounting: '',
    otherFeatures: '',
    powerCables: '',
    location: '',
    purchaseDate: '',
    totalCost: '',
    warranty: '',
    maintainedBy: '',
    otherInfo: '',
    connectedFolios: '',
    certificate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/switches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success('✅ Network switch added!');
        setForm({
          purchasedFrom: 'Institute NIFS',
          inventoryNumber: '',
          equipment: '',
          makeModel: '',
          serialNo: '',
          noOfPorts: '',
          portStatusIndicators: '',
          transmissionModes: '',
          baudRates: '',
          negotiation: '',
          mounting: '',
          otherFeatures: '',
          powerCables: '',
          location: '',
          purchaseDate: '',
          totalCost: '',
          warranty: '',
          maintainedBy: '',
          otherInfo: '',
          connectedFolios: '',
          certificate: ''
        });
      } else {
        toast.error('❌ Failed to add network switch.');
      }
    } catch (error) {
      console.error('Error submitting switch:', error);
      toast.error('❌ An error occurred while adding the switch.');
    }
  };

  function renderInput(label, name, readOnly = false, required = false, type = 'text') {
    return (
      <div style={rowStyle}>
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </label>
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          readOnly={readOnly}
          required={required}
          style={{ ...inputStyle, backgroundColor: readOnly ? '#f0f0f0' : '#fff' }}
        />
      </div>
    );
  }

  function renderSelect(label, name) {
    return (
      <div style={rowStyle}>
        <label style={labelStyle}>{label}</label>
        <select
          name={name}
          value={form[name]}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    );
  }

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add Network Switch</h2>
      <form onSubmit={handleSubmit}>
        {renderInput('Purchased/Transferred From', 'purchasedFrom', true, true)}
        {renderInput('Inventory Number', 'inventoryNumber', false, true)} {/* ✅ New field */}
        {renderInput('Equipment', 'equipment')}
        {renderInput('Make / Model', 'makeModel')}
        {renderInput('Serial No', 'serialNo')}
        {renderInput('No of Ports', 'noOfPorts')}
        {renderSelect('Port Status Indicators', 'portStatusIndicators')}
        {renderInput('Transmission Modes', 'transmissionModes')}
        {renderInput('Baud Rates', 'baudRates')}
        {renderInput('Negotiation', 'negotiation')}
        {renderSelect('Mounting', 'mounting')}
        {renderInput('Other Features', 'otherFeatures')}
        {renderSelect('Power Cables', 'powerCables')}
        {renderInput('Location', 'location')}
        {renderInput('Date of Purchase', 'purchaseDate', false, false, 'date')}
        {renderInput('Total Cost Rs.', 'totalCost')}
        {renderInput('Warranty', 'warranty')}
        {renderInput('Maintained By', 'maintainedBy')}
        {renderInput('Other Information', 'otherInfo')}
        {renderInput('Connected Folios', 'connectedFolios')}
        {renderInput('Certificate', 'certificate')}

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
  minWidth: '180px',
  fontWeight: 'normal',
};

const inputStyle = {
  flex: 1,
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

export default AddSwitch;
