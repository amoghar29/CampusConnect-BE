const Event = require("../../models/event");

async function updateEventBanner(req, res) {
    const { eventId } = req.params;
    const { imageUrl } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { banner: imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.json({
            message: "Event banner updated successfully",
            event: updatedEvent
        });
    } catch (error) {
        console.error('Error updating event banner:', error);
        res.status(500).json({
            message: "Error updating event banner",
            error: error.message
        });
    }
}

module.exports = updateEventBanner;
