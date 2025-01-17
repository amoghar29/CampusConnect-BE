const getAllEvents = require("../controllers/event/getAllEventsController");
const getEventsByClubId = require("../controllers/admin/getEventsByClub");
const getEventById = require("../controllers/event/getEventByEventId");
const router = require("express").Router();

router.get("/", getAllEvents);
router.get("/:eventId", getEventById);

module.exports = router;