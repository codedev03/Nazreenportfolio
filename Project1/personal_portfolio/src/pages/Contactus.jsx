import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../assets/css/Contact.css';

const Contact = React.forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [errors, setErrors] = useState({}); // State for error messages

    const formVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    const inputVariants = {
        hover: { scale: 1.05, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)' },
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const validatePhone = (phone) => {
        const phonePattern = /^\+?(\d{1,3})?[-.\s]?(\d{3})[-.\s]?(\d{4})$/; // Example for international format
        return phonePattern.test(phone);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        // Validate email
        if (!validateEmail(formData.email)) {
            formErrors.email = 'Invalid email format.';
        }

        // Validate phone
        if (!validatePhone(formData.phone)) {
            formErrors.phone = 'Invalid phone number format.';
        }

        // If there are errors, set them and stop submission
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Proceed with form submission
        try {
            const response = await axios.post('http://localhost:5000/api/contact', formData);
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
        } catch (error) {
            setStatus('Error sending message. Please try again.');
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
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>} {/* Error message for email */}

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
                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>} {/* Error message for phone */}

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
                        whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)' }}
                        transition={{ duration: 0.3 }}
                    >
                        Send Message
                    </motion.button>
                </form>
                {status && <p style={{ textAlign: 'center', color: '#ff7e5f' }}>{status}</p>}
            </motion.div>
        </div>
    );
});

export default Contact;