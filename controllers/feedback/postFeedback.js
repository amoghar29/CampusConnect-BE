const Feedback = require("../../models/feedback");

async function submitUserFeedback(req, res) {

  try {
    const { rating, selectedCategory, feedback, eventTitle, hostingClub } =
      req.body;

    const feedbackDetails = await Feedback.create({
      rating,
      selectedCategory,
      experienceDescription:feedback,
      eventTitle,
      hostingClub,
    });
    return res.status(201).json(feedbackDetails);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Submission failed" });
  }
}

module.exports = { submitUserFeedback };
