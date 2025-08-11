import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCPU = () => {
  const [form, setForm] = useState({
    purchasedFrom: 'Institute: NIFS', // fixed
    inventoryNumber: '',
    equipment: '',
    makeModel: '',
    serialNumber: '',
    powerRating: '',
    upsType: '',
    fullLoadBackupTime: '',
    remoteShutdown: '',
    batteryType: '',
    batterySize: '',
    overloadAlarm: '',
    inputVoltageRange: '',
    outputVoltageRange: '',
    rechargeTime: '',
    parallelPort: '',
    usbPort: '',
    lcdIndicator: '',
    dataCable: '',
    powerCable: '',
    interface: '',
    otherFeatures: '',
    location: '',
    purchaseDate: '',
    totalCost: '',
    warranty: '',
    maintainedBy: '',
    otherInformation: '',
    connectedFolios: ''
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
        toast.success('✅ UPS added successfully!');
        setForm({
          purchasedFrom: 'Institute: NIFS',
          inventoryNumber: '',
          equipment: '',
          makeModel: '',
          serialNumber: '',
          powerRating: '',
          upsType: '',
          fullLoadBackupTime: '',
          remoteShutdown: '',
          batteryType: '',
          batterySize: '',
          overloadAlarm: '',
          inputVoltageRange: '',
          outputVoltageRange: '',
          rechargeTime: '',
          parallelPort: '',
          usbPort: '',
          lcdIndicator: '',
          dataCable: '',
          powerCable: '',
          interface: '',
          otherFeatures: '',
          location: '',
          purchaseDate: '',
          totalCost: '',
          warranty: '',
          maintainedBy: '',
          otherInformation: '',
          connectedFolios: ''
        });
      } else {
        toast.error('❌ Failed to add UPS.');
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

  const renderYesNo = (label, name) => (
    <div style={rowStyle}>
      <label style={labelStyle}>{label}</label>
      <select name={name} value={form[name]} onChange={handleChange} style={inputStyle}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  );

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add UPS Details</h2>
      <form onSubmit={handleSubmit}>
        {renderInput("Purchased/Transferred From", "purchasedFrom", "text", true)}
        {renderInput("Inventory Number", "inventoryNumber", "text", true)}
        {renderInput("Equipment", "equipment", "text", true)}
        {renderInput("Make / Model", "makeModel", "text", true)}
        {renderInput("Serial No", "serialNumber")}
        {renderInput("Power Rating", "powerRating")}
        {renderInput("UPS Type", "upsType")}
        {renderInput("Full Load Backup Time", "fullLoadBackupTime")}
        {renderInput("Remote Shut Down", "remoteShutdown")}
        {renderInput("Battery Type", "batteryType")}
        {renderInput("Battery Size", "batterySize")}
        {renderInput("Overload Alarm", "overloadAlarm")}
        {renderInput("Input Voltage Range", "inputVoltageRange")}
        {renderInput("Output Voltage Range", "outputVoltageRange")}
        {renderInput("Recharge Time", "rechargeTime")}
        {renderYesNo("Parallel Port", "parallelPort")}
        {renderYesNo("USB Port", "usbPort")}
        {renderYesNo("LCD Indicator", "lcdIndicator")}
        {renderYesNo("Data Cable", "dataCable")}
        {renderYesNo("Power Cable", "powerCable")}
        {renderInput("Interface", "interface")}
        {renderInput("Other Features", "otherFeatures")}
        {renderInput("Location", "location")}
        {renderInput("Date of Purchase/Transfer", "purchaseDate", "date")}
        {renderInput("Total Cost Rs.", "totalCost")}
        {renderInput("Warranty", "warranty")}
        {renderInput("Maintained By", "maintainedBy")}
        {renderInput("Other Information", "otherInformation")}
        {renderInput("Connected Folios", "connectedFolios")}
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

// === Styles (unchanged) ===
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
