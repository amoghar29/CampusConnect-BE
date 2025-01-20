const Club = require("../../models/club");
const Admin = require("../../models/admin");

async function registerClub(req, res) {
  try {
    const {
      clubName,
      aboutUs,
      foundedYear,
      president,
      vicePresident,
      phoneNumber,
      socialMedia,
      email,
      membershipFee,
      achievements,
      clubRegistrationLink,
    } = req.body;

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

    let cleanedAchievements = [];
    if (achievements) {
      try {
        const achievementsArray = typeof achievements === 'string' 
          ? JSON.parse(achievements) 
          : achievements;
        
        cleanedAchievements = achievementsArray.slice(0, 3);
      } catch (error) {
        cleanedAchievements = [];
      }
    }

    const newClub = await Club.create({
      clubName,
      aboutUs,
      logo: req.file.path,
      foundedYear,
      president,
      vicePresident,
      clubRegistrationLink,
      email,
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
      achievements: cleanedAchievements,
      totalMembers: 0,
      createdBy: req.adminId,
    });

    await Admin.findByIdAndUpdate(req.adminId, {
      clubName,
      updatedAt: new Date(),
      clubId: newClub._id,
    });

    return res.status(201).json({
      message: "Club registered successfully",
      club: newClub,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while registering the club",
    });
  }
}

module.exports = registerClub;