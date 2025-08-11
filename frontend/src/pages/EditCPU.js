// src/pages/EditCPU.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCPU = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cpuData, setCpuData] = useState({
    purchasedFrom: '',
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

  useEffect(() => {
    const fetchCPU = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cpus/${id}`);
        console.log('Fetch status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('CPU data fetched:', data);
          setCpuData({
            purchasedFrom: data.purchasedFrom || '',
            inventoryNumber: data.inventoryNumber || '',
            equipment: data.equipment || '',
            makeModel: data.makeModel || '',
            serialNumber: data.serialNumber || '',
            powerRating: data.powerRating || '',
            upsType: data.upsType || '',
            fullLoadBackupTime: data.fullLoadBackupTime || '',
            remoteShutdown: data.remoteShutdown || '',
            batteryType: data.batteryType || '',
            batterySize: data.batterySize || '',
            overloadAlarm: data.overloadAlarm || '',
            inputVoltageRange: data.inputVoltageRange || '',
            outputVoltageRange: data.outputVoltageRange || '',
            rechargeTime: data.rechargeTime || '',
            parallelPort: data.parallelPort || '',
            usbPort: data.usbPort || '',
            lcdIndicator: data.lcdIndicator || '',
            dataCable: data.dataCable || '',
            powerCable: data.powerCable || '',
            interface: data.interface || '',
            otherFeatures: data.otherFeatures || '',
            location: data.location || '',
            purchaseDate: data.purchaseDate ? data.purchaseDate.slice(0, 10) : '',
            totalCost: data.totalCost || '',
            warranty: data.warranty || '',
            maintainedBy: data.maintainedBy || '',
            otherInformation: data.otherInformation || '',
            connectedFolios: data.connectedFolios || ''
          });
        } else {
          toast.error('Failed to load CPU data');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Error loading CPU data');
      }
    };
    fetchCPU();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCpuData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/cpus/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cpuData),
      });
      if (res.ok) {
        toast.success('CPU updated successfully');
        navigate('/view-cpus');  // make sure your route matches
      } else {
        toast.error('Failed to update CPU');
      }
    } catch (error) {
      toast.error('Error updating CPU');
    }
  };

  // Fields to render
  const fields = [
    { label: 'Purchased/Transferred From', name: 'purchasedFrom' },
    { label: 'Inventory Number', name: 'inventoryNumber' },
    { label: 'Equipment', name: 'equipment' },
    { label: 'Make / Model', name: 'makeModel' },
    { label: 'Serial Number', name: 'serialNumber' },
    { label: 'Power Rating', name: 'powerRating' },
    { label: 'UPS Type', name: 'upsType' },
    { label: 'Full Load Backup Time', name: 'fullLoadBackupTime' },
    { label: 'Remote Shut Down', name: 'remoteShutdown' },
    { label: 'Battery Type', name: 'batteryType' },
    { label: 'Battery Size', name: 'batterySize' },
    { label: 'Overload Alarm', name: 'overloadAlarm' },
    { label: 'Input Voltage Range', name: 'inputVoltageRange' },
    { label: 'Output Voltage Range', name: 'outputVoltageRange' },
    { label: 'Recharge Time', name: 'rechargeTime' },
    { label: 'Parallel Port', name: 'parallelPort' },
    { label: 'USB Port', name: 'usbPort' },
    { label: 'LCD Indicator', name: 'lcdIndicator' },
    { label: 'Data Cable', name: 'dataCable' },
    { label: 'Power Cable', name: 'powerCable' },
    { label: 'Interface', name: 'interface' },
    { label: 'Other Features', name: 'otherFeatures' },
    { label: 'Location', name: 'location' },
    { label: 'Date of Purchase/Transfer', name: 'purchaseDate', type: 'date' },
    { label: 'Total Cost Rs.', name: 'totalCost' },
    { label: 'Warranty', name: 'warranty' },
    { label: 'Maintained By', name: 'maintainedBy' },
    { label: 'Other Information', name: 'otherInformation' },
    { label: 'Connected Folios', name: 'connectedFolios' }
  ];

  return (
    <div className="container py-4" style={{ maxWidth: '800px', marginTop: '80px' }}>
      <h2 className="mb-4 text-center">Edit CPU Details</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name} className="form-label fw-bold">{label}</label>
            <input
              type={type || 'text'}
              id={name}
              name={name}
              className="form-control"
              value={cpuData[name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success px-4 py-2">
            Update CPU
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditCPU;
