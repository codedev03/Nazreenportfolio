import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaLinkedin } from 'react-icons/fa';

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const About = () => {
  const aboutTexts = [
    "Hello! I'm Nazreen V N, a passionate web developer with a love for creating dynamic and responsive web applications. I specialize in using React to build user-friendly interfaces that provide a seamless experience.",
    "With a background in Computer Applications and Design, I have honed my skills in front-end development and am always eager to explore new technologies.",
    "In my free time, I enjoy crafting, reading, and contributing to various projects. I believe in the power of collaboration and building solutions that make a difference.",
    "Feel free to reach out if you’d like to connect or collaborate!"
  ];

  return (
    <div
      id="About"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      }}
    >
      {/* Animated Blobs */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          zIndex: 0,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,198,255,0.4), transparent)',
          filter: 'blur(100px)',
        }}
      />
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-15%',
          zIndex: 0,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,78,80,0.4), transparent)',
          filter: 'blur(100px)',
        }}
      />

      {/* Glow overlay */}
      <motion.div
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.06), transparent)',
          mixBlendMode: 'overlay',
          zIndex: 1,
        }}
      />

      {/* 3D Tilt Card */}
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.25}
        transitionSpeed={1000}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          padding: '40px',
          borderRadius: '20px',
          maxWidth: '700px',
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>About Me</h1>
        <p style={{ fontSize: '1.1rem', color: '#ddd', marginBottom: '30px' }}>
          Get to know the developer behind the code
        </p>

        {aboutTexts.map((text, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              marginBottom: '20px',
              color: '#f5f5f5',
            }}
          >
            {text}
          </motion.p>
        ))}

        <div style={{ marginTop: '30px' }}>
          <a
            href="https://www.linkedin.com/in/nazreen-v-n"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
              color: '#fff',
              borderRadius: '30px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <FaLinkedin />
            Visit my LinkedIn
          </a>
        </div>
      </Tilt>
    </div>
  );
};

export default About;