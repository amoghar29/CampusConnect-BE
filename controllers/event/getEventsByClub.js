const { response } = require("express");
const Event = require("../../models/event");

async function getEventsByClubId(req, res) {
  const { clubId } = req.params;

  try {
    // Fetch events where 'clubId' matches
    const events = await Event.find({ clubName: clubId });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for the given club ID" });
    }

    res.status(200).json({ message: "Events fetched successfully", events });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: e.message });
  }
}

module.exports = getEventsByClubId;
