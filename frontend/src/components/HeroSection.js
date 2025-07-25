import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const images = [
    '/hero-bg.jpg',
    '/hero-bg2.jpg',
    '/hero-bg3.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
      {/* Background Image Slider */}
      <div
        style={{
          backgroundImage: `url("${images[currentIndex]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          transition: 'background-image 1s ease-in-out',
        }}
      />

      {/* Blue Overlay */}
      <div
        style={{
          backgroundColor: 'rgba(0, 40, 85, 0.6)',
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
        <h1 style={{ fontSize: '60px', fontWeight: 'bold' }}>Inventory System</h1>
      </div>
    </div>
  );
};

export default HeroSection;
