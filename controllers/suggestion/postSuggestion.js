const Suggestion = require("../../models/suggestion");

async function submitUserSuggestion(req, res) {
  const {
    userFullname,
    userEmail,
    userPhoneNumber,
    
    clubId,
    suggestedEventTitle,
    suggestedEventDescription,
    expectedHeadCount,
    expectedDuration,
    additionalNotes,
    branch,
    semester,
  } = req.body;

  const suggestionData = {
    userFullname,
    userEmail,
    userPhoneNumber,
    
    suggestedEventTitle,
    suggestedEventDescription,
    expectedHeadCount,
    expectedDuration,
    additionalNotes,
    branch,
    semester,
    clubId
  };

  try {
    const suggestionDetails = await Suggestion.create(suggestionData);
    return res.status(201).json({ suggestionDetails });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "error submitting suggestions" });
  }
}

module.exports = submitUserSuggestion;
