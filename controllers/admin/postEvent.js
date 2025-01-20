const Event = require("../../models/event");

async function postEvent(req, res) {
  const eventDetails = req.body;
  try {
    if (!eventDetails.title || !eventDetails.location) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["title", "date", "location"],
      });
    }

    if (typeof req.clubName !== "string") {
      return res.status(400).json({
        message: "Invalid club name",
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

    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
}

module.exports = postEvent;