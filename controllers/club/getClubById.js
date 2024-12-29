const Club = require("../../models/club");

async function getClubById(req, res) {
  const { clubId } = req.params; // Extract the id from params
  try {
    // Convert id to ObjectId and query the club
    const clubDetails = await Club.findById(clubId);

    // If club is not found
    if (!clubDetails) {
      return res.status(404).json({ message: "Club not found!" });
    }

    // If found, return the details
    res.status(200).json(clubDetails);
  } catch (err) {
    console.error("Error fetching club by ID:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getClubById;
