const { REPL_MODE_STRICT } = require("repl");
const Event = require("../../models/event");
const { response } = require("express");

async function deleteEventById(req, res) {
  const {eventId} = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully", deletedEvent });
  } catch (e) {
    res.status(400).json({ message: "Failed to delete event", error: e.message });
  }
}
module.exports = deleteEventById