import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../assets/css/Experience.css';

const experiences = [
  {
    title: 'Python/Django Intern',
    company: 'EasierClasses (EdTech Startup)',
    duration: 'Jan 2024 – March 2025',
    description:
      'Developing full-stack web applications using Django and PostgreSQL. Implemented OTP-based login, subscription-based access, and Razorpay payment integration. Collaborated with a small agile team to build scalable educational features.',
  },
  {
    title: 'Frontend Developer (Freelance)',
    company: 'Self-Employed',
    duration: 'Jul 2023 – Present',
    description:
      'Designed responsive user interfaces using React.js and Tailwind CSS. Built reusable components and integrated REST APIs. Created a personal portfolio and maintained projects.',
  },
  {
    title: 'MCA Academic Projects',
    company: 'University Projects',
    duration: '2022 – 2024',
    description:
      'Completed multiple academic projects involving Django, MySQL, and JavaScript. Created a basic event app and a student career system for students.',
  },
];

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [stars, setStars] = useState([]);
  const sectionRef = useRef(null); // Create a ref for the section

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after it becomes visible
        }
      },
      { threshold: 0.8 } // Trigger when 80% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up observer
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="experience-container" id="Experience" ref={sectionRef}>
      <h1 className="section-title">Professional Experience</h1>
      <div className="experience-cards">
        {experiences.map((exp, index) => (
          <motion.div
            className="experience-card"
            key={index}
            initial={{ opacity: 0, y: 50 }} // Initial state
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animate when visible
            transition={{ duration: 0.6, delay: index * 0.2 }} // Transition settings
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(128, 0, 255, 0.5)" }} // Hover effect
          >
            <div className="experience-header">
              <h2 className="experience-title">{exp.title}</h2>
              <span className="experience-duration">{exp.duration}</span>
            </div>
            <h3 className="experience-company">{exp.company}</h3>
            <p className="experience-description">{exp.description}</p>
          </motion.div>
        ))}
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
    </section>
  );
}

export default Experience;