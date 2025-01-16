const Event = require("../../models/event");

async function getEventsByClubId(req, res) {
  const  clubId  = req.clubId;

  try {
    // Fetch events where 'clubId' matches
    const events = await Event.find({ hostingClub: clubId });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for the given club ID" });
    }

    res.status(200).json(events);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: e.message });
  }
}

module.exports = getEventsByClubId;
