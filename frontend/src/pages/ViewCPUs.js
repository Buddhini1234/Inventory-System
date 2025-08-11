import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ViewCPUs = () => {
  const [upsList, setUpsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUPS = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cpus');
        if (response.ok) {
          const data = await response.json();
          setUpsList(data);
        } else {
          toast.error('Failed to fetch UPS data');
        }
      } catch (error) {
        toast.error('Error fetching UPS data');
      }
    };
    fetchUPS();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this UPS?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/cpus/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          toast.success('UPS deleted successfully');
          setUpsList(prev => prev.filter(ups => ups._id !== id));
        } else {
          toast.error('Failed to delete UPS');
        }
      } catch (err) {
        toast.error('Error deleting UPS');
      }
    }
  };

  const handleDownload = (ups) => {
    const worksheet = XLSX.utils.json_to_sheet([ups]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UPS');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const filename = `UPS-${ups.makeModel || ups._id}.xlsx`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(data);
    a.download = filename;
    a.click();
  };

  const exportAllToExcel = () => {
    if (upsList.length === 0) {
      toast.info('No UPS data to export');
      return;
    }

    const dataToExport = upsList.map(ups => ({
      'Purchased/Transferred From': ups.purchasedFrom,
      'Inventory Number': ups.inventoryNumber,
      'Equipment': ups.equipment,
      'Make / Model': ups.makeModel,
      'Serial No': ups.serialNumber,
      'Power Rating': ups.powerRating,
      'UPS Type': ups.upsType,
      'Full Load Backup Time': ups.fullLoadBackupTime,
      'Remote Shut Down': ups.remoteShutdown,
      'Battery Type': ups.batteryType,
      'Battery Size': ups.batterySize,
      'Overload Alarm': ups.overloadAlarm,
      'Input Voltage Range': ups.inputVoltageRange,
      'Output Voltage Range': ups.outputVoltageRange,
      'Recharge Time': ups.rechargeTime,
      'Parallel Port': ups.parallelPort,
      'USB Port': ups.usbPort,
      'LCD Indicator': ups.lcdIndicator,
      'Data Cable': ups.dataCable,
      'Power Cable': ups.powerCable,
      'Interface': ups.interface,
      'Other Features': ups.otherFeatures,
      'Location': ups.location,
      'Date of Purchase/Transfer': ups.purchaseDate,
      'Total Cost Rs.': ups.totalCost,
      'Warranty': ups.warranty,
      'Maintained By': ups.maintainedBy,
      'Other Information': ups.otherInformation,
      'Connected Folios': ups.connectedFolios
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UPS');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const filename = `All_UPS_${new Date().toISOString().slice(0,10)}.xlsx`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blobData);
    a.download = filename;
    a.click();

    toast.success('All UPS data exported successfully!');
  };

  const fields = [
    { label: 'Purchased/Transferred From', key: 'purchasedFrom' },
    { label: 'Inventory Number', key: 'inventoryNumber' },
    { label: 'Equipment', key: 'equipment' },
    { label: 'Make / Model', key: 'makeModel' },
    { label: 'Serial No', key: 'serialNumber' },
    { label: 'Power Rating', key: 'powerRating' },
    { label: 'UPS Type', key: 'upsType' },
    { label: 'Full Load Backup Time', key: 'fullLoadBackupTime' },
    { label: 'Remote Shut Down', key: 'remoteShutdown' },
    { label: 'Battery Type', key: 'batteryType' },
    { label: 'Battery Size', key: 'batterySize' },
    { label: 'Overload Alarm', key: 'overloadAlarm' },
    { label: 'Input Voltage Range', key: 'inputVoltageRange' },
    { label: 'Output Voltage Range', key: 'outputVoltageRange' },
    { label: 'Recharge Time', key: 'rechargeTime' },
    { label: 'Parallel Port', key: 'parallelPort' },
    { label: 'USB Port', key: 'usbPort' },
    { label: 'LCD Indicator', key: 'lcdIndicator' },
    { label: 'Data Cable', key: 'dataCable' },
    { label: 'Power Cable', key: 'powerCable' },
    { label: 'Interface', key: 'interface' },
    { label: 'Other Features', key: 'otherFeatures' },
    { label: 'Location', key: 'location' },
    { label: 'Date of Purchase/Transfer', key: 'purchaseDate' },
    { label: 'Total Cost Rs.', key: 'totalCost' },
    { label: 'Warranty', key: 'warranty' },
    { label: 'Maintained By', key: 'maintainedBy' },
    { label: 'Other Information', key: 'otherInformation' },
    { label: 'Connected Folios', key: 'connectedFolios' }
  ];

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <h2 className="text-center mb-4">UPS Inventory</h2>

      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={exportAllToExcel}
        >
          📁 Excel file downloaded
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col" className="text-start">Field</th>
              {upsList.map((_, index) => (
                <th scope="col" key={index}>UPS {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field.key}>
                <th scope="row" className="table-secondary text-start">{field.label}</th>
                {upsList.map(ups => (
                  <td key={ups._id + '-' + field.key}>
                    {ups[field.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <th scope="row" className="table-secondary text-start">Actions</th>
              {upsList.map(ups => (
                <td key={ups._id + '-buttons'} className="text-center">
                  <button
                    type="button"
                    className="btn btn-success btn-sm me-2"
                    onClick={() => navigate(`/edit-cpu/${ups._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(ups._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDownload(ups)}
                  >
                    Download
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ViewCPUs;
