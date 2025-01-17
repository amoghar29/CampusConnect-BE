const Event = require("../../models/event");

async function getAllWinners(req, res) {
  const winners = await Event.findById( );
  return res.status(200).json(winners);
}

module.exports = getAllWinners;
