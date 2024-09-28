const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  secure: true, 
});

const notifyUsers = async (email, message) => {
  try {
   
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: email, 
      subject: 'Consultation Notification',
      text: message, 
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};

module.exports = { notifyUsers };
