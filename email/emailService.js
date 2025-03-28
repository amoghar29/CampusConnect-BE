const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Sends an email using the configured transport
 * @param {string} receiver - Email address of the recipient
 * @param {string} subject - Subject of the email
 * @param {string} text - Body of the email
 * @returns {Promise<boolean>} - Returns true if email sent successfully
 */
const sendEmail = async (receiver, subject, text) => {
  

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiver,
      subject: subject,
      text: text,
    });
    console.log("Message sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendEmail;
