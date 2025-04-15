import React from 'react';
import profileImg from '../assets/images/reindeer.jpg'; // Update with your image path

const ProfileCard = () => {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      textAlign: 'center',
      padding: '30px',
      maxWidth: '350px',
      margin: '0 auto'
    }}>
      <img 
        src={profileImg} 
        alt="Nazreen" 
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #1e1e2f',
          marginBottom: '20px'
        }} 
      />
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '10px' }}>Nazreen V N</h2>
      <p style={{ color: '#666', fontSize: '1rem', marginBottom: '15px' }}>
        Python/Django & React Developer
      </p>
      <a 
        href="https://www.linkedin.com/in/nazreen-v-n"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#0072b1',
          color: '#fff',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Connect on LinkedIn
      </a>
    </div>
  );
};

export default ProfileCard;
