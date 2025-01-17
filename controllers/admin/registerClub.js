const Club = require("../../models/club");
const Admin = require("../../models/admin");
const { uploadToS3 } = require("../../aws/images");

async function registerClub(req, res) {
  try {
    const {
      clubName,
      aboutUs,
      foundedYear,
      president,
      vicePresident,
      email,
      phoneNumber,
      socialMedia,
      membershipFee,
      achievements,
    } = req.body;
    console.log(req.body);

    if (!clubName || !aboutUs) {
      return res.status(400).json({
        error: "Required fields missing",
        required: ["clubName", "logo (file)", "aboutUs"],
      });
    }

    const existingClub = await Club.findOne({ clubName });
    if (existingClub) {
      return res.status(400).json({
        error: "Club name already exists",
      });
    }

    const logoUrl = await uploadToS3(req.file, clubName);
    if (!logoUrl) {
      return res.status(500).json({
        error: "Error uploading logo",
      });
    }

    const newClub = await Club.create({
      clubName,
      aboutUs,
      logo: logoUrl,
      foundedYear,
      president,
      vicePresident,
      email: req.adminEmail,
      phoneNumber,
      socialMedia:
        typeof socialMedia === "string"
          ? JSON.parse(socialMedia)
          : {
              instagram: socialMedia?.instagram || "",
              twitter: socialMedia?.twitter || "",
              linkedin: socialMedia?.linkedin || "",
            },
      membershipFee,
      achievements: achievements || [],
      totalMembers: 0,
      createdBy: req.adminId,
    });

    // Update admin's clubName
    await Admin.findByIdAndUpdate(req.adminId, {
      clubName,
      updatedAt: new Date(),
      clubId : newClub._id
    });

    return res.status(201).json({
      message: "Club registered successfully",
      club: newClub,
    });
  } catch (error) {
    console.error("Error in registerClub:", error);
    return res.status(500).json({
      error: "An error occurred while registering the club",
    });
  }
}

module.exports = registerClub;
