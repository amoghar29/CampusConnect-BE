const Club = require("../../models/club");

async function getClubInfoById(req, res) {
  try {
    const clubId = req.clubId;

    if (!clubId) {
      return res.status(404).json({ error: "Club not registered yet" });
    }

    const clubInfo = await Club.findById(clubId);

    if (!clubInfo) {
      return res.status(404).json({ error: "Club not found" });
    }

    return res.status(200).json(clubInfo);
  } catch (error) {
    console.error("Error in getClubInfoById:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getClubInfoById
