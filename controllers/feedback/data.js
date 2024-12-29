const Feedback = require("../../models/feedback");

async function getFeedbackByClub(req, res) {
  const { clubId } = req.params;
  try {
    if (!clubId) {
      return res.status(400).json({ message: "Club name is required" });
    }
    const feedbacks = await Feedback.find({ __id: clubId });

    if (feedbacks.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for this club" });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getFeedbackByClub;