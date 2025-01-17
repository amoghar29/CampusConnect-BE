const Club = require("../../models/club");

async function getAllClubs(req, res) {
  const clubs = await Club.find({});

  return res.status(200).json(clubs);
}

async function getAllClubNames(req, res) {
  const clubs = await Club.find().select("clubName");
  return res.status(200).json(clubs);
}

module.exports = {getAllClubs,getAllClubNames};
