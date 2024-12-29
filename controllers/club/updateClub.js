const Club = require("../../models/club");

async function updateClubById(req, res) {
  const { clubId } = req.params;
  const updateDetails = req.body;
  console.log("pre update body",updateDetails)
  try {
    const updatedClub = await Club.findByIdAndUpdate(clubId, updateDetails, {
      new: true, // Return the updated document
      runValidators: true, // Run model validation on update
    });

    // If no document is found, return 404
    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }
    console.log("Update Request Details:", clubId, updateDetails);
    console.log("Updated Club Document:", updatedClub);

    // Return the updated document
    res.status(200).json({
      message: "Successfully updated",
      updatedClub,
    });
  } catch (e) {
    // Handle errors
    res.status(400).json({ message: "Failed to update", error: e.message });
  }
}

module.exports = updateClubById;
