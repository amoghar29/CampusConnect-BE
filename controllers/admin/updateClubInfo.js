const { uploadToS3 } = require("../../aws/images");
const Club = require("../../models/club");

async function updateClubInfoById(req, res) {
  const clubId  = req.clubId;
  const updateInfo = req.body;

  if ( req.file){
    const logoUrl = uploadToS3(updateInfo.logo,req.clubName);
    updateInfo.logo = logoUrl;
  }
 
  try {
    const updatedClub = await Club.findByIdAndUpdate(clubId, updateInfo, {
      new: true,
      runValidators: true, 
    });

    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }
    console.log("Update Request Info:", clubId, updateInfo);
    console.log("Updated Club Document:", updatedClub);

   
    res.status(200).json({
      message: "Successfully updated",
      updatedClub,
    });
  } catch (e) {
    res.status(400).json({ message: "Failed to update", error: e.message });
  }
}

module.exports = updateClubInfoById;
