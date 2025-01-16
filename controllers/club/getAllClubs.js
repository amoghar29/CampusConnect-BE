const Club = require("../../models/club");

async function getAllClubs(req, res) {
  const clubs = await Club.find({});

  return res.status(200).json(clubs);
}

module.exports = getAllClubs;
