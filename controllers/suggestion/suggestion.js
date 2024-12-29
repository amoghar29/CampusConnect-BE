const Suggestion = require("../../models/suggestion");

async function submitUserSuggestion(req, res) {
  const {
    name,
    email,
    phone,
    clubName,
    eventTitle,
    eventDescription,
    expectedParticipants,
    preferredDuration,
    additionalNotes,
    branch,
    semester,
  } = req.body;

  // Map frontend fields to schema fields
  const suggestionData = {
    userFullname: name,
    userEmail: email,
    userPhoneNumber: phone,
    clubName: clubName,
    suggestedEventTitle: eventTitle,
    suggestedEventDescription: eventDescription,
    expectedHeadCount: expectedParticipants,
    eventDuration: preferredDuration,
    additionalNotes: additionalNotes,
    branch: branch,
    semester: semester,
  };

  try {
    const suggestionDetails = await Suggestion.create(suggestionData);
    return res.status(201).json({ suggestionDetails });
  } catch (error) {

    return res.status(400).json({ error: "errror submmiting suggestions" });
  }
}

module.exports = submitUserSuggestion;
