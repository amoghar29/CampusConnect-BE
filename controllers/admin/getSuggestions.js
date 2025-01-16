const Suggestion = require("../../models/suggestion");

async function getSuggestionByClub(req, res) {
  console.log(req.body);
  
  const  clubId  = req.clubId;
  try {
    if (!clubId) {
      return res.status(400).json({ message: "Club name is required" });
    }
    const suggestion = await Suggestion.find({ clubId: clubId });

    res.status(200).json(suggestion);
  } catch (error) {
    console.error("Error fetching suggestion:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getSuggestionByClub;
