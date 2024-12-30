const deleteEventById = require("../controllers/event/deleteEvent");
const getAllEvents = require("../controllers/event/getAllEventsController");
const getEventsByClubId = require("../controllers/event/getEventsByClub");
const updateEventById = require("../controllers/event/updateEvent");
const getEventById = require("../controllers/event/getEventByEventId");
const router = require("express").Router();

router.get("/", getAllEvents);
router.get("/:eventId", getEventById);
router.get("/club/:clubId", getEventsByClubId); 
router.put("/:eventId", updateEventById); //admin only
router.delete("/:eventId", deleteEventById);//admin only

module.exports = router;