const Club = require("../../models/club");

async function getProfileDetails(req, res) {
  const { clubName } = req.params;

  const clubDetails = await Club.find({ clubName: clubName });

  return res.status(200).json(clubDetails);
}
module.exports = getProfileDetails;
