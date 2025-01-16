const Club = require("../../models/club");

async function getClubInfoById(req, res) {
  
  const clubId = req.clubId;

  const clubInfo = await Club.findById(clubId);

  if (!clubInfo) {
    return res.status(404).json({ error: "Club not found" });
  }

  return res.status(200).json(clubInfo);
}

module.exports = getClubInfoById
