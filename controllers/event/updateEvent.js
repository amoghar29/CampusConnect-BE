const { uploadToS3 } = require("../../aws/images");
const Event = require("../../models/event");
async function updateEvent(req, res) {
    const { eventId } = req.params;
    const {updateData} = req.body
    try {


        if (req.file) {
            const eventImageUrl = uploadToS3(req.file,req.clubName)
            updateData.eventImage = eventImageUrl;
        }
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent,
        });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            message: "Error updating event",
            error: error.message,
        });
    }
}

module.exports = updateEvent;
