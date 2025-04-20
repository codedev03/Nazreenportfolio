import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import profile from '../assets/images/profile.png';
import '../assets/css/Avatar.css';
import CurvyLines from './CurvyLines';
import magicWand from '../assets/images/magic-wand1.svg';
// --- Stars Component ---
const AnimatedStars = () => {
  const stars = Array.from({ length: 100 }).map((_, index) => ({
    id: index,
    left: Math.random() * 100 + 'vw', // Random horizontal position
    top: Math.random() * 100 + 'vh', // Random vertical position
    animationDuration: Math.random() * 3 + 2 + 's', // Random duration for each star
  }));

  useEffect(() => {
    const handleTouch = (e) => {
      const target = e.target;
      if (target.classList.contains('star')) {
        target.classList.add('touch-active');
        setTimeout(() => {
          target.classList.remove('touch-active');
        }, 1000); // 1 second glow
      }
    };
    document.addEventListener('touchstart', handleTouch);
    return () => {
      document.removeEventListener('touchstart', handleTouch);
    };
  }, []);

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

// --- SparkleTrail Component ---
const SparkleTrail = ({ x, y }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 500); // Sparkle fades in 0.5s
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="sparkle"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #fff 0%, #ff00ff 60%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 9999,
        animation: 'fadeOut 0.5s ease-out',
      }}
    />
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
  const sectionRef = useRef();

  const [touchPosition, setTouchPosition] = useState(null);
  const [trail, setTrail] = useState([]);
// Mouse sparkle trail
useEffect(() => {
  const handleMouseMove = (e) => {
    if (!sectionRef.current.contains(e.target)) return;

    setTrail((prev) => [
      ...prev,
      { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() },
    ]);
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
useEffect(() => {
  const cleanup = setInterval(() => {
    setTrail((prev) => prev.filter((sparkle) => Date.now() - sparkle.id < 500));
  }, 100);

  return () => clearInterval(cleanup);
}, []);



// Touch sparkle trail
useEffect(() => {
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (!sectionRef.current.contains(e.target)) return;

    const { clientX, clientY } = touch;
    setTouchPosition({ x: clientX, y: clientY });
    setTrail((prev) => [
      ...prev,
      { x: clientX, y: clientY, id: Date.now() + Math.random() },
    ]);
  };

  const handleTouchEnd = () => setTouchPosition(null);

  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);

  return () => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };
}, []);


  return (
    <div 
      ref={sectionRef}
      style={{
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
      {touchPosition && (
  <img
    src={magicWand}
    alt="Magic Wand"
    style={{
      position: 'fixed',
      left: touchPosition.x + 10,
      top: touchPosition.y + 10,
      width: '40px',
      height: '40px',
      pointerEvents: 'none',
      zIndex: 9999,
      transform: 'translate(-50%, -50%)',
    }}
  />
)}
{trail.map(({ x, y, id }) => (
  <SparkleTrail key={id} x={x} y={y} />
))}


    </div>
  );
};
export default AvatarSection;