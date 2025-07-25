import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewSwitch = () => {
  const [switches, setSwitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/switches')
      .then(res => res.json())
      .then(data => {
        setSwitches(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('❌ Failed to fetch switch data.');
        setLoading(false);
      });
  }, []);

  const fields = [
    { label: 'Equipment', key: 'equipment' },
    { label: 'Make / Model', key: 'makeModel' },
    { label: 'Serial No', key: 'serialNo' },
    { label: 'No of Ports', key: 'noOfPorts' },
    { label: 'Port Status Indicators', key: 'portStatusIndicators' },
    { label: 'Transmission Modes', key: 'transmissionModes' },
    { label: 'Baud Rates', key: 'baudRates' },
    { label: 'Negotiation', key: 'negotiation' },
    { label: 'Mounting', key: 'mounting' },
    { label: 'Power Cables', key: 'powerCables' },
    { label: 'Other Features', key: 'otherFeatures' },
    { label: 'Location', key: 'location' },
    { label: 'Purchase Date', key: 'purchaseDate' },
    { label: 'Total Cost', key: 'totalCost' },
    { label: 'Warranty', key: 'warranty' },
    { label: 'Maintained By', key: 'maintainedBy' },
    { label: 'Other Information', key: 'otherInfo' },
    { label: 'Connected Folios', key: 'connectedFolios' },
    { label: 'Certificate', key: 'certificate' }
  ];

  // Function to export one switch's data to Excel
  const exportSingleSwitchToExcel = (sw) => {
    const data = fields.map(field => ({
      [field.label]: sw[field.key] || '-',
    }));

    // Transform to key-value object for XLSX (instead of array of objects)
    // So convert array of single-key objects to one object:
    const formattedData = {};
    data.forEach(obj => {
      const key = Object.keys(obj)[0];
      formattedData[key] = obj[key];
    });

    const worksheet = XLSX.utils.json_to_sheet([formattedData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Switch');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const filename = `Switch-${sw.makeModel || sw._id}.xlsx`;
    saveAs(blobData, filename);
    toast.success(`📁 Excel downloaded for switch: ${sw.makeModel || sw._id}`);
  };

  const exportToExcel = () => {
    const data = switches.map(sw => {
      const entry = {};
      fields.forEach(field => {
        entry[field.label] = sw[field.key];
      });
      return entry;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Switches': worksheet }, SheetNames: ['Switches'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'switches.xlsx');
    toast.success('📁 Excel file downloaded');
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this switch?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/switches/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSwitches(prev => prev.filter(sw => sw._id !== id));
        toast.success('✅ Switch deleted successfully');
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error('❌ Failed to delete switch');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-switch/${id}`);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (switches.length === 0) return <p className="text-center py-4">No switch records found.</p>;

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <h2 className="text-center mb-4">Network Switch Inventory</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={exportToExcel}>
          📁 Export All to Excel
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th className="text-start">Field</th>
              {switches.map((_, i) => (
                <th key={i}>Switch {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field.key}>
                <th className="table-secondary text-start">{field.label}</th>
                {switches.map(sw => (
                  <td key={`${sw._id}-${field.key}`}>{sw[field.key] || '-'}</td>
                ))}
              </tr>
            ))}

            <tr>
              <th className="table-secondary text-start">Actions</th>
              {switches.map(sw => (
                <td key={`${sw._id}-actions`}>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleEdit(sw._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(sw._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => exportSingleSwitchToExcel(sw)}
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

export default ViewSwitch;
