const Suggestion = require("../../models/suggestion");

async function submitUserSuggestion(req, res) {
  const {
    userFullname,
    userEmail,
    userPhoneNumber,
    collegeClub,
    suggestedEventTitle,
    suggestedEventDescription,
    expectedHeadCount,
    eventDuration,
    additionalNotes,
  } = req.body;

  try {
    const suggestionDetails = await Suggestion.create({
      userFullname,
      userEmail,
      userPhoneNumber,
      collegeClub,
      suggestedEventTitle,
      suggestedEventDescription,
      expectedHeadCount,
      eventDuration,
      additionalNotes,
    });
    return res.status(200).json({ suggestionDetails });
  } catch (error) {
    return res.status(400).json({ error: "errror submmiting suggestions" });
  }
}

module.exports = submitUserSuggestion;
