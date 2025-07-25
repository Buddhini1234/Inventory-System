// src/pages/EditCPU.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditCPU = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cpuData, setCpuData] = useState({
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

  useEffect(() => {
    const fetchCPU = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cpus/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCpuData(data);
        } else {
          toast.error('Failed to load CPU data');
        }
      } catch (err) {
        toast.error('Error loading CPU');
      }
    };
    fetchCPU();
  }, [id]);

  const handleChange = (e) => {
    setCpuData({ ...cpuData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/cpus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cpuData),
      });

      if (res.ok) {
        toast.success('CPU updated successfully');
        navigate('/view-cpu');
      } else {
        toast.error('Failed to update CPU');
      }
    } catch (err) {
      toast.error('Error updating CPU');
    }
  };

  const renderInput = (label, name, required = false, type = 'text') => (
    <div className="mb-3" key={name}>
      <label htmlFor={name} className="form-label fw-bold">
        {label}{required && <span className="text-danger"> *</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-control"
        value={cpuData[name] || ''}
        onChange={handleChange}
        required={required}
      />
    </div>
  );

  const fieldOrder = [
    'makeModel',
    'type',
    'inventoryNumber',
    'serialNumber',
    'location',
    'processorSpeed',
    'ram',
    'hdd',
    'os',
    'totalCost',
    'maintainedBy',
    'warranty',
    'importantInfo',
    'purchaseDate',
  ];

  const fieldLabels = {
    makeModel: 'Make & Model',
    type: 'Type',
    inventoryNumber: 'Inventory Number',
    serialNumber: 'Serial Number',
    location: 'Location',
    processorSpeed: 'Processor Speed',
    ram: 'RAM',
    hdd: 'Hard Disk Drive',
    os: 'Operating System',
    totalCost: 'Total Cost',
    maintainedBy: 'Maintained By',
    warranty: 'Warranty',
    importantInfo: 'Important Info',
    purchaseDate: 'Purchase Date',
  };

  return (
    <div className="container py-4" style={{ maxWidth: '700px' }}>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h4>Edit CPU Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {fieldOrder.map((field) =>
              renderInput(
                fieldLabels[field],
                field,
                ['makeModel', 'type', 'inventoryNumber', 'serialNumber', 'location', 'totalCost', 'maintainedBy', 'warranty'].includes(field),
                field === 'purchaseDate' ? 'date' : 'text'
              )
            )}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 py-2">
                Update CPU
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCPU;
