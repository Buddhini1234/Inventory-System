import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddComputer = () => {
  const [form, setForm] = useState({
    purchasedFrom: 'Institute : NIFS',
    makeModel: '',
    type: '',
    inventoryNumber: '',
    serialNumber: '',
    location: '',
    processorSpeed: '',
    ram: '',
    hdd: '',
    floppy: '',
    cdRom: '',
    soundCard: '',
    tvCard: '',
    networkCard: '',
    modemExternal: '',
    modemInternal: '',
    graphicCard: '',
    motherBoard: '',
    deepCool: '',
    subTotal: '',
    keyboard: '',
    keyboardSN: '',
    mouse: '',
    mouseSN: '',
    micInternal: '',
    micInternalSN: '',
    micExternal: '',
    micExternalSN: '',
    scanner: '',
    scannerSN: '',
    monitorModel: '',
    monitorSN: '',
    monitorPurchaseDate: '',
    printerModel: '',
    printerSN: '',
    printerPurchaseDate: '',
    outputScannerModel: '',
    outputScannerSN: '',
    outputScannerPurchaseDate: '',
    upsModel: '',
    upsSN: '',
    upsPurchaseDate: '',
    networkCableModel: '',
    networkCableSN: '',
    networkCablePurchaseDate: '',
    os: '',
    totalCost: '',
    maintainedBy: '',
    importantInfo: '',
    warranty: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/computers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success('✅ Computer added!');
        setForm(prev => ({
          ...prev,
          makeModel: '', type: '', inventoryNumber: '', serialNumber: '', location: '',
          processorSpeed: '', ram: '', hdd: '', floppy: '', cdRom: '', soundCard: '', tvCard: '',
          networkCard: '', modemExternal: '', modemInternal: '', graphicCard: '', motherBoard: '',
          deepCool: '', subTotal: '',
          keyboard: '', keyboardSN: '', mouse: '', mouseSN: '', micInternal: '', micInternalSN: '',
          micExternal: '', micExternalSN: '', scanner: '', scannerSN: '',
          monitorModel: '', monitorSN: '', monitorPurchaseDate: '',
          printerModel: '', printerSN: '', printerPurchaseDate: '',
          outputScannerModel: '', outputScannerSN: '', outputScannerPurchaseDate: '',
          upsModel: '', upsSN: '', upsPurchaseDate: '',
          networkCableModel: '', networkCableSN: '', networkCablePurchaseDate: '',
          os: '', totalCost: '', maintainedBy: '', importantInfo: '', warranty: ''
        }));
      } else {
        toast.error('❌ Failed to add computer.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('❌ An error occurred while adding the computer.');
    }
  };

  const renderInput = (label, name, type = 'text', required = false) => (
    <div style={rowStyle}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        style={inputStyle}
        required={required}
      />
    </div>
  );

  const renderRadio = (label, name) => (
    <div style={rowStyle}>
      <label style={labelStyle}>{label}</label>
      <label><input type="radio" name={name} value="Yes" checked={form[name] === 'Yes'} onChange={handleChange} /> Yes</label>
      <label><input type="radio" name={name} value="No" checked={form[name] === 'No'} onChange={handleChange} /> No</label>
    </div>
  );

  const renderDeviceRow = (label, toggleName, snName) => (
    <div style={deviceRowStyle}>
      <div style={rowStyle}>
        <label style={labelStyle}>{label}</label>
        <label><input type="radio" name={toggleName} value="Yes" checked={form[toggleName] === 'Yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name={toggleName} value="No" checked={form[toggleName] === 'No'} onChange={handleChange} /> No</label>
      </div>
      <input type="text" name={snName} value={form[snName]} onChange={handleChange} placeholder="Serial Number" style={snInputStyle} />
    </div>
  );

  const renderThreeFieldsRow = (label, modelName, snName, dateName) => (
    <div style={{ ...rowStyle, flexWrap: 'wrap' }}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        name={modelName}
        placeholder="Make & Model"
        value={form[modelName]}
        onChange={handleChange}
        style={{ ...inputStyle, flex: 1 }}
      />
      <input
        type="text"
        name={snName}
        placeholder="Serial Number"
        value={form[snName]}
        onChange={handleChange}
        style={{ ...inputStyle, flex: 1 }}
      />
      <input
        type="date"
        name={dateName}
        value={form[dateName]}
        onChange={handleChange}
        style={{ ...inputStyle, flex: 1 }}
      />
    </div>
  );

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Add Computer Details</h2>
      <form onSubmit={handleSubmit}>
        {renderInput("Purchased/ Transferred from", "purchasedFrom")}

        <h3 style={sectionTitleStyle}>Computer (Make & Model)</h3>
        {renderInput("Make & Model", "makeModel", 'text', true)}
        {renderInput("Type", "type", 'text', true)}
        {renderInput("Inventory Number", "inventoryNumber", 'text', true)}
        {renderInput("Serial Number", "serialNumber", 'text', true)}
        {renderInput("Location", "location", 'text', true)}
        {renderInput("Processor (Speed)", "processorSpeed")}
        {renderInput("RAM (Capacity)", "ram")}
        {renderInput("Hard Disk Drive (Capacity)", "hdd")}

        {/* Two-column radio buttons section */}
        <div style={twoColumnContainer}>
          <div style={columnStyle}>
            {renderRadio("Floppy Disk Drive", "floppy")}
            {renderRadio("CD- Rom", "cdRom")}
            {renderRadio("Sound Card", "soundCard")}
            {renderRadio("TV card", "tvCard")}
            {renderRadio("Network card", "networkCard")}
          </div>
          <div style={columnStyle}>
            {renderRadio("Modem - External", "modemExternal")}
            {renderRadio("Modem - Internal", "modemInternal")}
            {renderRadio("Graphic card", "graphicCard")}
            {renderRadio("Mother Board", "motherBoard")}
            {renderRadio("Deep Cool", "deepCool")}
          </div>
        </div>

        {renderInput("Sub total cost", "subTotal")}

        <h3 style={sectionTitleStyle}>Input Devices</h3>
        {renderDeviceRow("Key Board", "keyboard", "keyboardSN")}
        {renderDeviceRow("Mouse", "mouse", "mouseSN")}
        {renderDeviceRow("Microphone - Internal", "micInternal", "micInternalSN")}
        {renderDeviceRow("Microphone - External", "micExternal", "micExternalSN")}
        {renderDeviceRow("Scanners", "scanner", "scannerSN")}

        <h3 style={sectionTitleStyle}>Output Devices</h3>
        {renderThreeFieldsRow("Monitor", "monitorModel", "monitorSN", "monitorPurchaseDate")}
        {renderThreeFieldsRow("Printer", "printerModel", "printerSN", "printerPurchaseDate")}
        {renderThreeFieldsRow("Scanner", "outputScannerModel", "outputScannerSN", "outputScannerPurchaseDate")}

        <h3 style={sectionTitleStyle}>UPS AND NETWORK CABLE</h3>
        {renderThreeFieldsRow("UPS", "upsModel", "upsSN", "upsPurchaseDate")}
        {renderThreeFieldsRow("Network Cable", "networkCableModel", "networkCableSN", "networkCablePurchaseDate")}

        <h3 style={sectionTitleStyle}>Operating system</h3>
        {renderInput("Operating System", "os")}

        <h3 style={sectionTitleStyle}>Total cost</h3>
        {renderInput("Total Cost", "totalCost", 'text', true)}
        {renderInput("Maintained By", "maintainedBy", 'text', true)}
        {renderInput("Any other important information", "importantInfo", 'text', true)}
        {renderInput("Warranty", "warranty", 'text', true)}

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

const sectionTitleStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
  marginTop: '20px',
  marginBottom: '10px',
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

const snInputStyle = {
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginLeft: '10px',
  flex: 1,
};

const deviceRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const twoColumnContainer = {
  display: 'flex',
  gap: '40px',
  marginBottom: '12px',
};

const columnStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
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

export default AddComputer;
