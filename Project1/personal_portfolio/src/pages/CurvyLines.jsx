import React from 'react';
import '../assets/css/CurvyLines.css'; // Import the CSS for the curvy lines

const CurvyLines = () => {
  return (
    <div className="curvy-lines">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="line" />
      ))}
    </div>
  );
};

export default CurvyLines;