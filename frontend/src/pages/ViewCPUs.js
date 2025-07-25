import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ViewCPU = () => {
  const [cpus, setCpus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCPUs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cpus');
        if (response.ok) {
          const data = await response.json();
          setCpus(data);
        } else {
          toast.error('Failed to fetch CPU data');
        }
      } catch (error) {
        toast.error('Error fetching CPU data');
      }
    };
    fetchCPUs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this CPU?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/cpus/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          toast.success('CPU deleted successfully');
          setCpus(prev => prev.filter(cpu => cpu._id !== id));
        } else {
          toast.error('Failed to delete CPU');
        }
      } catch (err) {
        toast.error('Error deleting CPU');
      }
    }
  };

  const handleDownload = (cpu) => {
    const worksheet = XLSX.utils.json_to_sheet([cpu]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CPU');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const filename = `CPU-${cpu.makeModel || cpu._id}.xlsx`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(data);
    a.download = filename;
    a.click();
  };

  const exportAllToExcel = () => {
    if (cpus.length === 0) {
      toast.info('No CPU data to export');
      return;
    }

    const dataToExport = cpus.map(cpu => ({
      'Make & Model': cpu.makeModel,
      'Type': cpu.type,
      'Inventory Number': cpu.inventoryNumber,
      'Serial Number': cpu.serialNumber,
      'Location': cpu.location,
      'Processor Speed': cpu.processorSpeed,
      'RAM': cpu.ram,
      'Hard Disk Drive': cpu.hdd,
      'Operating System': cpu.os,
      'Total Cost': cpu.totalCost,
      'Maintained By': cpu.maintainedBy,
      'Warranty': cpu.warranty,
      'Important Info': cpu.importantInfo,
      'Purchase Date': cpu.purchaseDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CPUs');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const filename = `All_CPUs_${new Date().toISOString().slice(0,10)}.xlsx`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blobData);
    a.download = filename;
    a.click();

    toast.success('All CPU data exported successfully!');
  };

  const fields = [
    { label: 'Make & Model', key: 'makeModel' },
    { label: 'Type', key: 'type' },
    { label: 'Inventory Number', key: 'inventoryNumber' },
    { label: 'Serial Number', key: 'serialNumber' },
    { label: 'Location', key: 'location' },
    { label: 'Processor Speed', key: 'processorSpeed' },
    { label: 'RAM', key: 'ram' },
    { label: 'Hard Disk Drive', key: 'hdd' },
    { label: 'Operating System', key: 'os' },
    { label: 'Total Cost', key: 'totalCost' },
    { label: 'Maintained By', key: 'maintainedBy' },
    { label: 'Warranty', key: 'warranty' },
    { label: 'Important Info', key: 'importantInfo' },
    { label: 'Purchase Date', key: 'purchaseDate' }
  ];

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <h2 className="text-center mb-4">CPU Inventory</h2>

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
              {cpus.map((_, index) => (
                <th scope="col" key={index}>CPU {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field.key}>
                <th scope="row" className="table-secondary text-start">{field.label}</th>
                {cpus.map(cpu => (
                  <td key={cpu._id + '-' + field.key}>
                    {cpu[field.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <th scope="row" className="table-secondary text-start">Actions</th>
              {cpus.map(cpu => (
                <td key={cpu._id + '-buttons'} className="text-center">
                  <button
                    type="button"
                    className="btn btn-success btn-sm me-2"
                    onClick={() => navigate(`/edit-cpu/${cpu._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(cpu._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDownload(cpu)}
                  >
                    Download
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Toast Container to show toast messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ViewCPU;
