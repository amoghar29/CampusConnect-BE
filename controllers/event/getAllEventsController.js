const Event = require("../../models/event");

async function getAllEvents(req, res) {
  const events = await Event.find({});

  return res.status(200).json(events);
}

module.exports = getAllEvents;
