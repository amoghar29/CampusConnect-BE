const Event = require("../../models/event");

async function getEventById(req, res) {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event details:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getEventById;
