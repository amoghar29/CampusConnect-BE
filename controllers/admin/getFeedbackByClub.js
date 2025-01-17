const Feedback = require("../../models/feedback");

async function getFeedbackByClub(req, res) {
  const clubId = req.clubId
  try {
    const feedbacks = await Feedback.find({ hostingClub: clubId });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getFeedbackByClub;