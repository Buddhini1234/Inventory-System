import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDesktop, FaServer, FaNetworkWired } from 'react-icons/fa';

const SummarySection = () => {
  const [counts, setCounts] = useState({
    computers: 0,
    ups: 0,
    switches: 0
  });

  // Fetch data on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/summary')
      .then(res => setCounts(res.data))
      .catch(err => console.error('Error fetching summary:', err));
  }, []);

  const data = [
    { icon: <FaDesktop size={100} color="#00bcd4" />, label: 'COMPUTERS', count: counts.computers },
    { icon: <FaServer size={100} color="#00bcd4" />, label: 'UPS', count: counts.cpus },
    { icon: <FaNetworkWired size={100} color="#00bcd4" />, label: 'NETWORK SWITCHES', count: counts.switches }
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '360px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9fc',
      padding: '3rem 1rem'
    }}>
      <div style={{
        display: 'flex',
        gap: '5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {data.map((item, index) => (
          <div key={index} style={{
            width: '300px',
            height: '300px',
            backgroundColor: '#e6e6f0',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.3s ease'
          }}>
            {item.icon}
            <div style={{
              marginTop: '12px',
              fontSize: '26px',
              fontWeight: '600',
              color: '#01579b'
            }}>{item.label}</div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              marginTop: '6px',
              color: '#01579b'
            }}>{String(item.count).padStart(2, '0')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;
