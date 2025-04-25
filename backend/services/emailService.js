const nodemailer = require('nodemailer');
require('dotenv').config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter is ready to send emails');
  }
});

const sendWelcomeEmail = async (userEmail, firstName) => {
  try {
    console.log('Attempting to send welcome email to:', userEmail);
    console.log('Using email service:', process.env.EMAIL_SERVICE);
    console.log('Using email user:', process.env.EMAIL_USER);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Welcome to EventHub! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Hi ${firstName},</h2>
          
          <p>Welcome to EventHub! We're thrilled to have you on board. 🎉</p>
          <p>You've just taken the first step toward discovering and registering for incredible events, all in one place.</p>
          
          <h3 style="color: #2c3e50;">Here's what you can do next:</h3>
          <ul>
            <li>Browse upcoming events tailored to your interests</li>
            <li>Register with ease using our quick & secure system</li>
            <li>Track all your events in one simple dashboard</li>
          </ul>
          
          <p>Your account is ready, and we're here to make your event experience smooth and enjoyable.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/login" 
               style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Log In Now
            </a>
          </div>
          
          <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:eventhub.messages@gmail.com">eventhub.messages@gmail.com</a></p>
          
          <p>Let's make every event count!</p>
          
          <p style="margin-top: 30px;">
            Warm regards,<br>
            The EventHub Team
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
};

const sendRegistrationEmail = async (userEmail, eventDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Event Registration Confirmation',
      html: `
        <h2>Registration Confirmation</h2>
        <p>Thank you for registering for the event!</p>
        <h3>Event Details:</h3>
        <ul>
          <li><strong>Event:</strong> ${eventDetails.title}</li>
          <li><strong>Date:</strong> ${new Date(eventDetails.date_time).toLocaleString()}</li>
          <li><strong>Location:</strong> ${eventDetails.location}</li>
        </ul>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,<br>The EventHub Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration confirmation email sent to:', userEmail);
    return true;
  } catch (error) {
    console.error('Error sending registration email:', error);
    return false;
  }
};

const sendRegistrationNotification = async (organizerEmail, eventDetails, studentName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: organizerEmail,
      subject: 'New Event Registration',
      html: `
        <h2>New Registration Alert</h2>
        <p>A new student has registered for your event.</p>
        <h3>Registration Details:</h3>
        <ul>
          <li><strong>Student:</strong> ${studentName}</li>
          <li><strong>Event:</strong> ${eventDetails.title}</li>
          <li><strong>Date:</strong> ${new Date(eventDetails.date_time).toLocaleString()}</li>
          <li><strong>Location:</strong> ${eventDetails.location}</li>
        </ul>
        <p>Best regards,<br>The EventHub Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration notification sent to organizer:', organizerEmail);
    return true;
  } catch (error) {
    console.error('Error sending registration notification:', error);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendRegistrationEmail,
  sendRegistrationNotification
}; 