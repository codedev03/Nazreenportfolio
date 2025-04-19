import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../assets/css/Contact.css';
import { Phone, Mail, MessageCircle } from 'lucide-react'; // Import icons

const Contact = React.forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [errors, setErrors] = useState({});

    const formVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    const inputVariants = {
        hover: { scale: 1.05, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.3)' },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation (you can expand this as needed)
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('Please fill in all required fields.');
            return;
        }
    
        const apiUrl = process.env.VITE_API_URL; // Get the API URL from the environment variable
    
        try {
            const response = await axios.post(`${apiUrl}/contact`, formData);
            setStatus('Message sent successfully!'); // Update status on success
            setFormData({ name: '', email: '', phone: '', message: '' }); // Clear the form
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('Failed to send message. Please try again later.'); // Update status on error
        }
    };

    return (
        <div ref={ref} id="Contact" className="contact-container">
            <motion.div
                className="contact-form"
                initial="hidden"
                animate="visible"
                variants={formVariants}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ color: '#ff7e5f', textAlign: 'center' }}>Contact Me</h1>
                <form onSubmit={handleSubmit}>
                    <motion.input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        variants={inputVariants}
                        whileHover="hover"
                        required
                    />
                    <motion.input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        variants={inputVariants}
                        whileHover="hover"
                        required
                    />
                    <motion.input
                        type="text"
                        name="phone"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        variants={inputVariants}
                        whileHover="hover"
                        required
                    />
                    <div style={{ position: 'relative' }}>
                        <motion.textarea
                            name="message"
                            placeholder="Your Message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            variants={inputVariants}
                            whileHover="hover"
                            required
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        />
                        {showTooltip && (
                            <div className="tooltip">Please include your phone number in the message.</div>
                        )}
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.3)' }}
                        transition={{ duration: 0.3 }}
                    >
                        Send Message
                    </motion.button>
                </form>
                {status && <p style={{ textAlign: 'center', color: '#ff7e5f' }}>{status}</p>}
            </motion.div>

            {/* Animated Icons */}
            <div className="animated-icons">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', top: '10%', left: '10%', opacity: 0.5 }}
                >
                    <Phone size={40} color="#ff7e5f" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', top: '20%', right: '10%', opacity: 0.5 }}
                >
                    <Mail size={40} color="#ff7e5f" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
                >
                    <MessageCircle size={40} color="#ff7e5f" />
                </motion.div>
            </div>
        </div>
    );
});

export default Contact;