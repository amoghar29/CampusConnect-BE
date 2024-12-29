const Club = require("../../models/club");

async function addClub(req, res) {
  const clubDetails = req.body;

  try {
    const response = await Club.create(clubDetails);
  } catch (e) {
    res.status(400).json({ Error: e });
  }
  res.status(201).json({ "message": response });
}

module.exports = addClub
