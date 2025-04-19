const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // For sending emails
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Simple message for the root route
});

// Endpoint to handle form submissions
app.post('/api/contact', (req, res) => {
    console.log('Received data:', req.body);
    const { name, email, phone, message } = req.body; // Include phone in destructuring

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable
            pass: process.env.EMAIL_PASS, // Use environment variable
        },
    });

    const mailOptions = {
        from: email, // Sender's email
        to: process.env.EMAIL_USER, // Recipient's email (your email)
        subject: `New message from ${name}`,
        text: `You have received a new message from ${name} (${email}, ${phone}):\n\n${message}`, // Include name, email, and phone in the email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email: ' + error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});