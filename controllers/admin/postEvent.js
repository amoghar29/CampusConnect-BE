const Event = require("../../models/event");

async function postEvent(req, res) {
  const eventDetails = req.body;
  console.log("===== POST EVENT DEBUG =====");
  console.log("clubId:", req.clubId);
  console.log("clubName:", req.clubName);
  console.log("adminId:", req.adminId);
  console.log("eventDetails:", JSON.stringify(eventDetails, null, 2));
  console.log("has file:", !!req.file);
  if (req.file) {
    console.log("file path:", req.file.path);
  }
  console.log("============================");

  try {
    if (!req.clubId) {
      return res.status(400).json({
        message: "Please register your club before creating events",
        error: "Club not registered",
      });
    }

    if (!eventDetails.title || !eventDetails.location) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["title", "date", "location"],
      });
    }

    if (!req.clubName || typeof req.clubName !== "string") {
      console.error("Invalid clubName:", req.clubName, "type:", typeof req.clubName);
      return res.status(400).json({
        message: "Invalid club name",
        debug: { clubName: req.clubName, type: typeof req.clubName }
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Event banner is required",
        error: "No file uploaded",
      });
    }

    if (!req.file.path) {
      return res.status(400).json({
        message: "File upload failed",
        error: "No file path received from storage",
      });
    }

    const newEvent = await Event.create({
      ...eventDetails,
      createdBy: req.adminId,
      hostingClub: req.clubId,
      hostingClubName: req.clubName,
      banner: req.file.path,
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
      eventId: newEvent._id,
    });
  } catch (error) {
    console.error("===== POST EVENT ERROR =====");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("============================");
    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
}

module.exports = postEvent;