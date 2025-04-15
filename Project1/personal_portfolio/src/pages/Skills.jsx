import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faJsSquare, faReact, faGitAlt, faNodeJs } from '@fortawesome/free-brands-svg-icons'; // Importing Node.js icon for Express
import { faDatabase, faCog } from '@fortawesome/free-solid-svg-icons'; // Using faCog for Postman
import '../assets/css/Skills.css'; // Still using the same CSS file

const techStack = [
  { name: 'Python', level: 100, icon: <FontAwesomeIcon icon={faPython} /> },
  { name: 'Django', level: 95, icon: <FontAwesomeIcon icon={faPython} /> }, // Using Python icon for Django
  { name: 'JavaScript', level: 90, icon: <FontAwesomeIcon icon={faJsSquare} /> },
  { name: 'React.js', level: 85, icon: <FontAwesomeIcon icon={faReact} /> },
  { name: 'Express.js', level: 80, icon: <FontAwesomeIcon icon={faNodeJs} /> }, // Adding Express.js with Node.js icon
  { name: 'PostgreSQL', level: 80, icon: <FontAwesomeIcon icon={faDatabase} /> },
  { name: 'HTML/CSS', level: 95, icon: <span>🌐</span> }, // You can replace this with an actual icon if available
  { name: 'Git & GitHub', level: 90, icon: <FontAwesomeIcon icon={faGitAlt} /> },
  { name: 'REST APIs', level: 85, icon: <span>🔗</span> }, // You can replace this with an actual icon if available
  { name: 'Postman API', level: 80, icon: <FontAwesomeIcon icon={faCog} /> }, // Using faCog for Postman
];

function TechStack() {
  const [animate, setAnimate] = useState(false);
  const [stars, setStars] = useState([]);

  const handleMouseMove = () => {
    const newStars = Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100 + 'vw',
      top: Math.random() * 100 + 'vh',
      opacity: Math.random(),
      size: Math.random() * 5 + 5 + 'px',
    }));
    setStars(newStars);
  };

  useEffect(() => {
    setAnimate(true);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="skills-container" id="Skills">
      <h1 style={{ color: 'white', textAlign: 'center' }}>Tech Stack</h1>
      <div className="skills-cards">
        {/* Skills Card */}
        <div className="skills-card">
          <div className="skills-grid">
            <div className="skills-column">
              {techStack.slice(0, Math.ceil(techStack.length / 2)).map((tech, index) => (
                <div className="skill" key={index}>
                  <div className="skill-label">
                    <span>{tech.name}</span>
                    <span>{tech.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: animate ? `${tech.level}%` : '0%',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="skills-column">
              {techStack.slice(Math.ceil(techStack.length / 2)).map((tech, index) => (
                <div className="skill" key={index}>
                  <div className="skill-label">
                    <span>{tech.name}</span>
                    <span>{tech.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width : animate ? `${tech.level}%` : '0%',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Icons Card */}
        <div className="icons-card">
          <div className="icons-container">
            {techStack.map((tech, index) => (
              <div className="skill-icon" key={index}>
                <span>{tech.icon}</span> {/* Actual icon component */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            opacity: star.opacity,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
}

export default TechStack;