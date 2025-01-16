const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const postEvent = require("../controllers/admin/postEvent");
const registerClub = require("../controllers/admin/registerClub");
const deleteEventById = require("../controllers/event/deleteEvent");
const updateEventById = require("../controllers/event/updateEvent");
const getAdminInfo = require("../controllers/admin/getAdminInfo");
const updateClubInfoById = require("../controllers/admin/updateClubInfo.js");
const getClubInfoById = require("../controllers/admin/getClubInfoById.js");
const getSuggestionByClub = require("../controllers/admin/getSuggestions.js")
// const { checkAdminOwnership } = require("../middleware/adminAuth");
const getEventsByClubId = require("../controllers/admin/getEventsByClub.js")
router.post("/post-event", upload.single("banner"), postEvent);
router.post("/register-club", upload.single("logo"), registerClub);
router.delete("/events/:eventId", deleteEventById);
router.put("/events/update-event/:eventId", updateEventById);
router.get("/clubs/clubInfo", getClubInfoById);
router.put("/clubs/clubInfo", updateClubInfoById);
router.get("/adminInfo", getAdminInfo);
router.get("/suggestions", getSuggestionByClub);
router.get("/events", getEventsByClubId); 

module.exports = router;
