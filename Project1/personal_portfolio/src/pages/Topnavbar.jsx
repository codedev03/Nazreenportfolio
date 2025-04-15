import React, { useState, useContext } from 'react';
import { Link } from 'react-scroll';
import { ThemeContext } from './ThemeContext'; // Adjust the path if necessary
import '../assets/css/Topnavbar.css';

function Topnavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useContext(ThemeContext); // Use the context to get theme
    const [activeLink, setActiveLink] = useState('Home'); // State to track the active link

    const toggleSidebar = () => {
        setIsOpen(prevState => !prevState);
        console.log("Sidebar is now", !isOpen ? "open" : "closed");
    };

    const handleLinkClick = (link) => {
        setActiveLink(link); // Set the active link
        toggleSidebar(); // Close the sidebar after clicking
    };

    return (
        <div>
            <button className="menu-icon" onClick={toggleSidebar}>☰</button>
            <div className={`sidebar ${theme} ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>✖</button>
                <nav>
                    <Link to="Home" smooth={true} duration={500} onClick={() => handleLinkClick('Home')} className={activeLink === 'Home' ? 'active' : ''}>Home</Link>
                    <Link to="Skills" smooth={true} duration={500} onClick={() => handleLinkClick('Skills')} className={activeLink === 'Skills' ? 'active' : ''}>Skills</Link>
                    <Link to="Qualification" smooth={true} duration={500} onClick={() => handleLinkClick('Qualification')} className={activeLink === 'Qualification' ? 'active' : ''}>Qualification</Link>
                    <Link to="Experience" smooth={true} duration={500} onClick={() => handleLinkClick('Experience')} className={activeLink === 'Experience' ? 'active' : ''}>Experience</Link>
                    <Link to="Services" smooth={true} duration={500} onClick={() => handleLinkClick('Services')} className={activeLink === 'Services' ? 'active' : ''}>Services</Link>
                    <Link to="About" smooth={true} duration={500} onClick={() => handleLinkClick('About')} className={activeLink === 'About' ? 'active' : ''}>About me</Link>
                    <Link to="Contact" smooth={true} duration={500} onClick={() => handleLinkClick('Contact')} className={activeLink === 'Contact' ? 'active' : ''}>Contact me</Link>
                </nav>
            </div>
        </div>
    );
}

export default Topnavbar;