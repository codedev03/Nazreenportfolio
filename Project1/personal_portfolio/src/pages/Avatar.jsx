import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import profile from '../assets/images/profile.png';
import '../assets/css/Avatar.css';
import CurvyLines from './CurvyLines';
// --- Stars Component ---
const AnimatedStars = () => {
  const stars = Array.from({ length: 100 }).map((_, index) => ({
    id: index,
    left: Math.random() * 100 + 'vw', // Random horizontal position
    top: Math.random() * 100 + 'vh', // Random vertical position
    animationDuration: Math.random() * 3 + 2 + 's', // Random duration for each star
  }));

  return (
    <>
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top, // Start from a random vertical position
            animationDuration: star.animationDuration,
            animationName: 'moveTowards', // Ensure the animation name is set
          }}
        />
      ))}
    </>
  );
};

// --- AvatarCard Component ---
const AvatarCard = () => {
  return (
    <div
      className="card magic-cursor" // Add class for zoom and custom cursor
      style={{
        width: '300px',
        height: 'auto',
        background: '#1e293b',
        borderRadius: '1rem',
        padding: '1.5rem',
        color: 'white',
        boxShadow: '0 0 30px rgba(0,255,255,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src={profile}
        alt="Nazreen"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '20px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        }}
        className="profile-image"
      />
      <h3 style={{ marginTop: '1rem' }}>Nazreen V N</h3>
      <p>Software Developer</p>
      {/* Stars Container */}
      <div className="stars-container">
        <AnimatedStars />
      </div>
    </div>
  );
};

function AvatarModel({ hover }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/avatar.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (hover) {
      actions['WaveAnimation']?.play();
      actions['SmileAnimation']?.play();
    } else {
      actions['WaveAnimation']?.stop();
      actions['SmileAnimation']?.stop();
    }
  }, [hover, actions]);

  useFrame(() => {
    if (hover && group.current) {
      group.current.rotation.y += 0.01; // Ensure this line is correct
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={3.5} position={[0, -3.5, 0]} />
    </group>
  );
}

// --- AvatarCanvas Component ---
const AvatarCanvas = () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="card magic-cursor" // Add class for zoom and custom cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: '400px',
        width: '400px',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#0f172a',
        boxShadow: '0 0 30px rgba(0,255,255,0.1)',
      }}
    >
      <Canvas>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Suspense fallback={null}>
          <AvatarModel hover={hover} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      {/* Stars Container */}
      <div className="stars-container">
        <AnimatedStars />
      </div>
    </div>
    
  );
};

// --- Combined Component ---
const AvatarSection = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      padding: '2rem',
      flexWrap: 'wrap',
      backgroundColor: '#020617',
      minHeight: '100vh',
      position: 'relative', // Position relative for stars
      overflow: 'hidden', // Hide overflow for stars
    }}>
      <AnimatedStars />
      <CurvyLines />
      <AvatarCard />
      <AvatarCanvas />
    </div>
  );
};
export default AvatarSection;