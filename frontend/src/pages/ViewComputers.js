import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';

const ViewComputerVerticalFull = () => {
  const [computers, setComputers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComputers();
  }, []);

  const fetchComputers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/computers');
      const data = await res.json();
      setComputers(data);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch computers');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this computer?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/computers/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('✅ Deleted successfully');
        fetchComputers();
      } else {
        toast.error('❌ Deletion failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Error deleting entry');
    }
  };

  const handleDownload = (computer, index) => {
    const data = fields.map(field => ({
      Field: field.label,
      Value: computer[field.key] || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Computer Details');

    const filename = `Computer_${index + 1}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const exportAllToExcel = () => {
    if (computers.length === 0) {
      toast.warning("⚠️ No computers to export");
      return;
    }

    const allData = [];

    computers.forEach((computer, index) => {
      fields.forEach(field => {
        allData.push({
          Computer: `Computer ${index + 1}`,
          Field: field.label,
          Value: computer[field.key] || '-',
        });
      });
      allData.push({}); // Empty row between each computer
    });

    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'All Computers');
    XLSX.writeFile(workbook, 'All_Computers.xlsx');
  };

  const fields = [
    { key: 'makeModel', label: 'Make & Model' },
    { key: 'type', label: 'Type' },
    { key: 'inventoryNumber', label: 'Inventory Number' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'location', label: 'Location' },
    { key: 'processorSpeed', label: 'Processor Speed' },
    { key: 'ram', label: 'RAM' },
    { key: 'hdd', label: 'HDD' },
    { key: 'floppy', label: 'Floppy' },
    { key: 'cdRom', label: 'CD ROM' },
    { key: 'soundCard', label: 'Sound Card' },
    { key: 'tvCard', label: 'TV Card' },
    { key: 'networkCard', label: 'Network Card' },
    { key: 'modemExternal', label: 'Modem External' },
    { key: 'modemInternal', label: 'Modem Internal' },
    { key: 'graphicCard', label: 'Graphic Card' },
    { key: 'motherBoard', label: 'Mother Board' },
    { key: 'deepCool', label: 'Deep Cool' },
    { key: 'subTotal', label: 'Sub Total' },
    { key: 'keyboard', label: 'Keyboard' },
    { key: 'keyboardSN', label: 'Keyboard SN' },
    { key: 'mouse', label: 'Mouse' },
    { key: 'mouseSN', label: 'Mouse SN' },
    { key: 'micInternal', label: 'Mic Internal' },
    { key: 'micInternalSN', label: 'Mic Internal SN' },
    { key: 'micExternal', label: 'Mic External' },
    { key: 'micExternalSN', label: 'Mic External SN' },
    { key: 'scanner', label: 'Scanner' },
    { key: 'scannerSN', label: 'Scanner SN' },
    { key: 'monitorModel', label: 'Monitor Model' },
    { key: 'monitorSN', label: 'Monitor SN' },
    { key: 'monitorPurchaseDate', label: 'Monitor Purchase Date' },
    { key: 'printerModel', label: 'Printer Model' },
    { key: 'printerSN', label: 'Printer SN' },
    { key: 'printerPurchaseDate', label: 'Printer Purchase Date' },
    { key: 'outputScannerModel', label: 'Output Scanner Model' },
    { key: 'outputScannerSN', label: 'Output Scanner SN' },
    { key: 'outputScannerPurchaseDate', label: 'Output Scanner Purchase Date' },
    { key: 'upsModel', label: 'UPS Model' },
    { key: 'upsSN', label: 'UPS SN' },
    { key: 'upsPurchaseDate', label: 'UPS Purchase Date' },
    { key: 'networkCableModel', label: 'Network Cable Model' },
    { key: 'networkCableSN', label: 'Network Cable SN' },
    { key: 'networkCablePurchaseDate', label: 'Network Cable Purchase Date' },
    { key: 'os', label: 'Operating System' },
    { key: 'totalCost', label: 'Total Cost' },
    { key: 'maintainedBy', label: 'Maintained By' },
    { key: 'importantInfo', label: 'Important Info' },
    { key: 'warranty', label: 'Warranty' },
  ];

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <h2 className="text-center mb-4">Computer Inventory</h2>

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
              <th scope="col">Field</th>
              {computers.map((_, index) => (
                <th scope="col" key={index}>Computer {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field.key}>
                <th scope="row" className="table-secondary text-start">{field.label}</th>
                {computers.map(comp => (
                  <td key={comp._id + field.key}>{comp[field.key] || '-'}</td>
                ))}
              </tr>
            ))}

            <tr>
              <th scope="row" className="table-secondary text-start">Actions</th>
              {computers.map((comp, index) => (
                <td key={comp._id + '-actions'}>
                  <button
                    type="button"
                    className="btn btn-success btn-sm me-2"
                    onClick={() => navigate(`/edit-computer/${comp._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(comp._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDownload(comp, index)}
                  >
                    Download
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewComputerVerticalFull;
