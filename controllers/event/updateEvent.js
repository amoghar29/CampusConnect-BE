const { response } = require("express");
const Event = require("../../models/event");

async function updateEventById(req, res) {
  const { eventId } = req.params;
  const updateDetails = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateDetails, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Success", event: updatedEvent });
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
}

module.exports = updateEventById;
