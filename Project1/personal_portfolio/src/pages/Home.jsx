import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import Avatar from './Avatar';
import Typewriter from './Typewriter'; // Import the Typewriter component
import '../assets/css/Home.css'; // 👉 Create a CSS file for animations and styles

function Home() {
  return (
    <div
      className="hero-section"
      style={{
        background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="Home"
    >
      {/* Floating 3D Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape cube"></div>
        <div className="shape sphere"></div>
        <div className="shape pyramid"></div>
      </div>

      <div className="container">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ flex: 1 }}
        >
          <motion.h1
            style={{ fontSize: '3rem', fontWeight: 'bold' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Hi, I'm Nazreen
          </motion.h1>
          <motion.h2
            style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Typewriter text={['Software Developer', 'Problem Solver', 'Innovator']} />
          </motion.h2>
          <motion.div className="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{ flex: 1 }}
          >
              <div className="blob"></div> {/* Fluid blob background */}
              Hi there, I'm a dedicated <span className="highlight">Python Developer</span> and Software Engineer based in Kochi. 
              I specialize in building efficient backends, seamless APIs, and modern web applications. 
              I’m passionate about crafting <span className="highlight">clean, maintainable code</span> and delivering meaningful user experiences.
          </motion.div>

          <Link to="Contact" smooth={true} duration={500}>
            <motion.button
              className="glowing-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px #00ffff' }}
            >
              Let's Connect
            </motion.button>
          </Link>
        </motion.div>

        {/* Avatar Section */}
        <motion.div
          className="avatar-container"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // 💡 Ensures vertical alignment
            position: 'relative',
          }}
        >
          <Avatar />
        </motion.div>

      </div>
    </div>
  );
}

export default Home;