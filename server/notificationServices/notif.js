const nodemailer = require('nodemailer');

// Configure the Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email
const sendNotification = async (email, subject, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  });
};

// Function to notify users
exports.notifyUsers = async (pediatreEmail, childEmail) => {
  const subject = 'Upcoming Consultation Scheduled';
  const text = 'You have a new consultation scheduled. Please check the details on your dashboard.';

  await sendNotification(pediatreEmail, subject, text);
  await sendNotification(childEmail, subject, text);
};
