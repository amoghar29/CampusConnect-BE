const sendEmail = require("../../email/emailService.js");
const Club = require("../../models/club.js");

module.exports = async function sendQuery(req, res) {
  const { clubName, event, name, userEmail, userPhoneNumber, query } = req.body;
  console.log(clubName);

  const club = await Club.findOne({ clubName: clubName }).projection({
    email: 1,
  });

  if (!club) {
    return res
      .json({
        error: "club not found",
      })
      .status(404);
  }
  const subject = `You have a query from ${name} regarding ${event}`;

  // Create a structured email body with user's contact information
  const emailBody = `
Query Details:
--------------
From: ${name}
Email: ${userEmail}
Phone: ${userPhoneNumber}
Event: ${event}

Query:
${query}

Please respond to the user's contact details provided above.`;

  const result = sendEmail(club.email, subject, emailBody);

  if (!result) {
    return res.json({ error: "failed to submit query" }).status(401);
  }
  return res
    .status(201)
    .json({ success: true, message: "we will get back to you shortly" });
};
