import React from 'react';
import Tilt from 'react-parallax-tilt';

const TestTilt = () => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.25}
      transitionSpeed={1000}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      style={{ width: '300px', height: '200px', background: 'lightblue' }}
    >
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Tilt Me!</h2>
      </div>
    </Tilt>
  );
};

export default TestTilt;