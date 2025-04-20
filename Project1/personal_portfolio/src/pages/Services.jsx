import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Code2, Server, PenTool, Database } from "lucide-react";

const servicesData = [
  {
    icon: <Server size={40} />,
    title: "Backend Development",
    description: "Designing scalable backend systems using Python, Django, and RESTful APIs.",
  },
  {
    icon: <Code2 size={40} />,
    title: "Frontend Integration",
    description: "Creating smooth, interactive UIs with React and integrating them with robust APIs.",
  },
  {
    icon: <Database size={40} />,
    title: "Database Design",
    description: "Structuring efficient databases using PostgreSQL, MySQL, and SQLite.",
  },
  {
    icon: <PenTool size={40} />,
    title: "SEO & Performance",
    description: "Optimizing web apps for speed, search engine visibility, and user engagement.",
  },
];

const Services = () => {
  const { scrollY } = useScroll();
  const yCard = useTransform(scrollY, [0, 500], [0, -30]); // subtle upward motion

  const yBlob1 = useSpring(useTransform(scrollY, [0, 500], [0, 150]), { stiffness: 80, damping: 20 });
  const yBlob2 = useSpring(useTransform(scrollY, [0, 500], [0, -150]), { stiffness: 80, damping: 20 });

  const [stars, setStars] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    const newStars = Array.from({ length: 15 }).map((_, index) => ({
      id: index,
      left: e.clientX + (Math.random() * 30 - 15) + 'px', // Random offset for x
      top: e.clientY + (Math.random() * 30 - 15) + 'px', // Random offset for y
      opacity: Math.random(),
      size: Math.random() * 5 + 5 + 'px',
    }));
    setStars(newStars);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      createStarTrail(x, y);
    };
  
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        const x = touch.clientX;
        const y = touch.clientY;
        createStarTrail(x, y);
      }
    };
  
    const createStarTrail = (x, y) => {
      setMousePosition({ x, y });
      const newStars = Array.from({ length: 15 }).map((_, index) => ({
        id: Date.now() + index,
        left: x + (Math.random() * 30 - 15) + 'px',
        top: y + (Math.random() * 30 - 15) + 'px',
        opacity: Math.random(),
        size: Math.random() * 5 + 5 + 'px',
      }));
      setStars(newStars);
      setTimeout(() => {
        setStars([]);
      }, 700); // clears trail after 0.7s
      
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #0f172a, #020617)",
        padding: "80px 20px 0 20px",
        minHeight: "100vh",
        position: "relative",
        color: "white",
        overflow: "visible",
      }}
      id="Services"
    >
      {/* Background Blur Blobs (Parallax) */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "500px",
          height: "500px",
          background: "rgba(128, 0, 255, 0.5)",
          borderRadius: "50%",
          filter: "blur(150px)",
          zIndex: 0,
          y: yBlob1,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "25%",
          right: "5%",
          width: "500px",
          height: "500px",
          background: "rgba(0, 200, 255, 0.5)",
          borderRadius: "50%",
          filter: "blur(180px)",
          zIndex: 0,
          y: yBlob2,
        }}
      />

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        Services
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
          paddingBottom: "40px",
        }}
      >
        {servicesData.map((service, index) => (
          <motion.div
          key={index}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(128, 0, 255, 0.5)",
          }}
          whileTap={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(128, 0, 255, 0.5)",
          }}
          initial={{ opacity: 1, y: 0 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(14px)",
            borderRadius: "16px",
            padding: "20px 18px",
            width: "220px",
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
            textAlign: "center",
            position: "relative",
            cursor: "pointer",
            y: yCard,
          }}
        >
          <div style={{ marginBottom: "15px" }}>{service.icon}</div>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "10px", color: "#8b5cf6" }}>
            {service.title}
          </h2>
          <p style={{ fontSize: "0.95rem" }}>{service.description}</p>
        </motion.div>
        
        ))}
      </div>

      {/* Floating Icons Around Cards */}
      {servicesData.map((service, i) => (
        <motion.div
          key={`float-${i}`}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity }}
          style={{
            position: "absolute",
            top: `${20 + i * 15}%`,
            left: `${i % 2 === 0 ? 5 : 90}%`,
            opacity: 0.2, // Increased opacity for better visibility
            zIndex: 0,
          }}
        >
          {service.icon}
        </motion.div>
      ))}

      {/* Star Shower Effect */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            opacity: star.opacity,
            width: star.size,
            height: star.size,
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
            borderRadius: "50%",
            animation: "twinkle 1s infinite alternate",
          }}
        />
      ))}

      {/* SVG Wave Background Animation */}
      <div style={{ position: "absolute", bottom: 0, width: "100%", zIndex: -1 }}>
        <svg viewBox="0 0 1440 320" style={{ display: "block" }}>
          <path
            fill="#1e293b"
            fillOpacity="1"
            d="M0,64L40,80C80,96,160,128,240,138.7C320,149,400,139,480,117.3C560,96,640,64,720,64C800,64,880,96,960,117.3C1040,139,1120,149,1200,133.3C1280,117,1360,75,1400,53.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Services;