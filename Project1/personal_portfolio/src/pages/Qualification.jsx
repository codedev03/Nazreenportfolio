import React, { useEffect, useState } from 'react';
import '../assets/css/Qualification.css';

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
    title: 'Bachelor of Computer Applications(BCA)',
    institution: 'MG University',
    year: '2019 – 2022',
  },
];

function Qualification() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const rect = document.getElementById('Qualification').getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      setIsVisible(true);
      window.removeEventListener('scroll', handleScroll); // Remove listener after visibility is set
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="qualification-container" id="Qualification">
      <h1 className="qualification-main-title">My Journey in Tech</h1>
      <div className={`qualification-capsules ${isVisible ? 'fade-in' : ''}`}>
        {qualifications.map((qual, index) => (
          <div className={`qualification-capsule ${isVisible ? 'show' : ''}`} key={index}>
            <h3>{qual.title}</h3>
            <p>{qual.institution} | {qual.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Qualification;