const Event = require("../../models/event");
const { uploadToS3 } = require("../../aws/images");
async function postEvent(req, res) {
  const eventDetails = req.body;
  
  try {
    // Validate required fields
    if (!eventDetails.title || !eventDetails.clubName || !eventDetails.location) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["title", "clubName", "date", "location"]
      });
    }
    const result = await uploadToS3(req.file, eventDetails.clubName);
    if (!result) {
      return res.status(500).json({
        message: "Error uploading image to S3",
      });
    }
    const newEvent = await Event.create({
      ...eventDetails,
      createdBy: "fd", // From auth middleware
      banner: result // Will be updated after S3 upload
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
      eventId: newEvent._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
}

module.exports = postEvent;
