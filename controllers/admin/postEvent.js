const Event = require("../../models/event");
const { uploadToS3 } = require("../../aws/images");
async function postEvent(req, res) {
  const eventDetails = req.body;

  try {
    if (!eventDetails.title || !eventDetails.location) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["title", , "date", "location"],
      });
    }
    const result = await uploadToS3(req.file, req.clubName);

    if (!result) {
      return res.status(500).json({
        message: "Error uploading image to S3",
      });
    }

    if (typeof req.clubName !== "string") {
      return res.status(400).json({
        message: "Invalid club name",
      });
    }

    eventDetails.hostingClub = req.clubId;
   

    const newEvent = await Event.create({
      ...eventDetails,
      createdBy: req.adminId,
      hostingClubName : req.clubName,
      banner: result, // Will be updated after S3 upload
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
