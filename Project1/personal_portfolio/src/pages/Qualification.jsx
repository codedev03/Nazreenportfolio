import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import '../assets/css/Qualification.css';
import { ThemeContext } from './ThemeContext';

const qualifications = [
  {
    title: 'Master of Computer Applications (MCA)',
    institution: 'MG University',
    year: '2022 – 2024',
  },
  {
    title: 'Full-Stack Python Django React Course (Internship)',
    institution: 'LuminarTechnolab',
    year: '2024-2025',
  },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'MG University',
    year: '2019 – 2022',
  },
];

function Qualification() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleMode = () => {
    setDarkMode(prev => !prev);
    setShowTooltip(true); // Show tooltip temporarily
  };

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <section className={`timeline-container ${darkMode ? 'dark-mode' : 'light-mode'}`} id="Qualification">
      <div className="mode-toggle">
        <div className="mode-btn-wrapper">
          <motion.button
            onClick={toggleMode}
            title="Toggle theme"
            className="mode-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <span role="img" aria-label="Sun">🌞</span>
            ) : (
              <span role="img" aria-label="Moon">🌜</span>
            )}
          </motion.button>
        </div>
        {showTooltip && (
          <div className="mobile-tooltip">
            Toggle theme
          </div>
        )}
      </div>


      <motion.h1
        className={`qualification-main-title ${darkMode ? 'gradient-text' : ''}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Journey in Tech
      </motion.h1>

      <div className="timeline">
        {qualifications.map((qual, index) => (
          <motion.div
            className="timeline-item"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="timeline-dot">
              <svg viewBox="0 0 200 200">
                <defs>
                  <radialGradient id={`grad-${index}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#b3caff" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </radialGradient>
                </defs>
                <path
                  d="M40,-60C60,-40,80,-20,60,0C40,20,20,40,0,60C-20,80,-40,60,-60,40C-80,20,-60,0,-40,-20C-20,-40,0,-60,20,-80C40,-60,40,-60,40,-60Z"
                  fill={`url(#grad-${index})`}
                >
                  <animate
                    attributeName="d"
                    dur="10s"
                    repeatCount="indefinite"
                    values="
                      M40,-60C60,-40,80,-20,60,0C40,20,20,40,0,60C-20,80,-40,60,-60,40C-80,20,-60,0,-40,-20C-20,-40,0,-60,20,-80C40,-60,40,-60,40,-60Z;
                      M60,-40C80,-20,60,20,40,40C20,60,-20,60,-40,40C-60,20,-80,-20,-60,-40C-40,-60,-20,-80,20,-80C60,-80,80,-60,60,-40Z;
                      M40,-60C60,-40,80,-20,60,0C40,20,20,40,0,60C-20,80,-40,60,-60,40C-80,20,-60,0,-40,-20C-20,-40,0,-60,20,-80C40,-60,40,-60,40,-60Z
                    "
                  />
                </path>
              </svg>
            </div>
            <div className="timeline-card">
              <h3>{qual.title}</h3>
              <div className="institution-info">
                <div className="institution-logo">
                  <GraduationCap size={28} color="#5a78f0" />
                </div>
                <p>{qual.institution}</p>
              </div>
              <span className="year">{qual.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Qualification;