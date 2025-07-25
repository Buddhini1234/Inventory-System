import React from 'react';

const HeroSection = () => {
  return (
    <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
      {/* Background Image */}
      <div
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Blue Overlay */}
      <div
        style={{
          backgroundColor: 'rgba(0, 40, 85, 0.6)', // dark blue with transparency
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      />

      {/* Text Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>Inventory System</h1>
      </div>
    </div>
  );
};

export default HeroSection;
