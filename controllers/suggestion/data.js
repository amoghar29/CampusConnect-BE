const Suggestion = require("../../models/suggestion");

async function getSuggestionByClub(req, res) {
  const { clubId } = req.params;
  try {
    if (!clubId) {
      return res.status(400).json({ message: "Club name is required" });
    }
    const suggestion = await Suggestion.find({ __id: clubId });

    if (suggestion.length === 0) {
      return res
        .status(404)
        .json({ message: "No suggestions found for this club" });
    }

    res.status(200).json(suggestion);
  } catch (error) {
    console.error("Error fetching suggestion:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getSuggestionByClub;
