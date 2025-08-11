// src/pages/EditSwitch.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditSwitch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    purchasedFrom: '',
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
    powerCables: '',
    otherFeatures: '',
    location: '',
    purchaseDate: '',
    totalCost: '',
    warranty: '',
    maintainedBy: '',
    otherInfo: '',
    connectedFolios: '',
    certificate: ''
  });

  useEffect(() => {
    const fetchSwitch = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/switches/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setForm(data);
      } catch (err) {
        toast.error("❌ Failed to load switch details");
      }
    };
    fetchSwitch();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/switches/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success("✅ Switch updated successfully");
      setTimeout(() => navigate('/details/switch'), 2000);
    } catch {
      toast.error("❌ Failed to update switch");
    }
  };

  const renderInput = (label, name, type = 'text') => (
    <div className="mb-3" key={name}>
      <label htmlFor={name} className="form-label fw-bold">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={form[name] || ''}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  );

  const renderSelect = (label, name) => (
    <div className="mb-3" key={name}>
      <label htmlFor={name} className="form-label fw-bold">{label}</label>
      <select
        id={name}
        name={name}
        value={form[name] || ''}
        onChange={handleChange}
        className="form-select"
      >
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );

  const fields = [
    { label: "Purchased/Transferred From", name: "purchasedFrom", type: "text" },
    { label: "Inventory Number", name: "inventoryNumber", type: "text" },
    { label: "Equipment", name: "equipment", type: "text" },
    { label: "Make / Model", name: "makeModel", type: "text" },
    { label: "Serial No", name: "serialNo", type: "text" },
    { label: "No of Ports", name: "noOfPorts", type: "text" },
    { label: "Port Status Indicators", name: "portStatusIndicators", type: "select" },
    { label: "Transmission Modes", name: "transmissionModes", type: "text" },
    { label: "Baud Rates", name: "baudRates", type: "text" },
    { label: "Negotiation", name: "negotiation", type: "text" },
    { label: "Mounting", name: "mounting", type: "select" },
    { label: "Power Cables", name: "powerCables", type: "select" },
    { label: "Other Features", name: "otherFeatures", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Date of Purchase", name: "purchaseDate", type: "date" },
    { label: "Total Cost", name: "totalCost", type: "text" },
    { label: "Warranty", name: "warranty", type: "text" },
    { label: "Maintained By", name: "maintainedBy", type: "text" },
    { label: "Other Information", name: "otherInfo", type: "text" },
    { label: "Connected Folios", name: "connectedFolios", type: "text" },
    { label: "Certificate", name: "certificate", type: "text" }
  ];

  return (
    <div className="container py-4" style={{ maxWidth: '700px' , marginTop: '80px'}}>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h4>Edit Network Switch</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {fields.map(({ label, name, type }) =>
              type === 'select' ? renderSelect(label, name) : renderInput(label, name, type)
            )}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 py-2">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSwitch;
