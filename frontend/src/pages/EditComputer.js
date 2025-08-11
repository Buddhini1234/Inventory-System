import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditComputer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchComputer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/computers/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        toast.error('❌ Failed to load computer details');
      }
    };
    fetchComputer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/computers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success('✅ Computer updated successfully');
      navigate('/view-computers');
    } catch (err) {
      console.error(err);
      toast.error('❌ Update failed');
    }
  };

  const renderInput = (label, name, required = false) => (
    <div className="mb-3" key={name}>
      <label className="form-label fw-bold">
        {label}{required && ' *'}
      </label>
      <input
        type="text"
        name={name}
        className="form-control"
        value={formData[name] || ''}
        onChange={handleChange}
        required={required}
      />
    </div>
  );

  // Exactly 16 fields in each section
  const section1 = [
    'makeModel', 'type', 'inventoryNumber', 'serialNumber', 'location',
    'processorSpeed', 'ram', 'hdd', 'floppy', 'cdRom', 'soundCard',
    'tvCard', 'networkCard', 'modemExternal', 'modemInternal', 'graphicCard'
  ];

  const section2 = [
    'motherBoard', 'deepCool', 'subTotal', 'keyboard', 'keyboardSN', 'mouse',
    'mouseSN', 'micInternal', 'micInternalSN', 'micExternal', 'micExternalSN',
    'scanner', 'scannerSN', 'monitorModel', 'monitorSN', 'monitorPurchaseDate'
  ];

  const section3 = [
    'printerModel', 'printerSN', 'printerPurchaseDate', 'outputScannerModel',
    'outputScannerSN', 'outputScannerPurchaseDate', 'upsModel', 'upsSN', 'upsPurchaseDate',
    'networkCableModel', 'networkCableSN', 'networkCablePurchaseDate', 'os',
    'totalCost', 'maintainedBy', 'importantInfo'
    // Removed 'warranty' to keep 16 fields exactly
  ];

  const fieldLabels = {
    makeModel: 'Make & Model',
    type: 'Type',
    inventoryNumber: 'Inventory Number',
    serialNumber: 'Serial Number',
    location: 'Location',
    processorSpeed: 'Processor Speed',
    ram: 'RAM',
    hdd: 'HDD',
    floppy: 'Floppy',
    cdRom: 'CD ROM',
    soundCard: 'Sound Card',
    tvCard: 'TV Card',
    networkCard: 'Network Card',
    modemExternal: 'Modem External',
    modemInternal: 'Modem Internal',
    graphicCard: 'Graphic Card',
    motherBoard: 'Mother Board',
    deepCool: 'Deep Cool',
    subTotal: 'Sub Total',
    keyboard: 'Keyboard',
    keyboardSN: 'Keyboard SN',
    mouse: 'Mouse',
    mouseSN: 'Mouse SN',
    micInternal: 'Mic Internal',
    micInternalSN: 'Mic Internal SN',
    micExternal: 'Mic External',
    micExternalSN: 'Mic External SN',
    scanner: 'Scanner',
    scannerSN: 'Scanner SN',
    monitorModel: 'Monitor Model',
    monitorSN: 'Monitor SN',
    monitorPurchaseDate: 'Monitor Purchase Date',
    printerModel: 'Printer Model',
    printerSN: 'Printer SN',
    printerPurchaseDate: 'Printer Purchase Date',
    outputScannerModel: 'Output Scanner Model',
    outputScannerSN: 'Output Scanner SN',
    outputScannerPurchaseDate: 'Output Scanner Purchase Date',
    upsModel: 'UPS Model',
    upsSN: 'UPS SN',
    upsPurchaseDate: 'UPS Purchase Date',
    networkCableModel: 'Network Cable Model',
    networkCableSN: 'Network Cable SN',
    networkCablePurchaseDate: 'Network Cable Purchase Date',
    os: 'Operating System',
    totalCost: 'Total Cost',
    maintainedBy: 'Maintained By',
    importantInfo: 'Important Info',
    warranty: 'Warranty'
  };

  return (
    <div className="container py-4" style={{ marginTop: '80px' }}>
      <div className="card shadow-lg">
        <div className="card-header text-center bg-primary text-white">
          <h4>Edit Computer Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                {section1.map(key => renderInput(fieldLabels[key], key))}
              </div>
              <div className="col-md-4">
                {section2.map(key => renderInput(fieldLabels[key], key))}
              </div>
              <div className="col-md-4">
                {section3.map(key => renderInput(fieldLabels[key], key))}
              </div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 py-2">
                Update Computer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditComputer;
