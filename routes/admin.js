const express = require("express");
const router = express.Router();
const imageUpload = require("../middleware/imgUpload");
const postEvent = require("../controllers/admin/postEvent");
const registerClub = require("../controllers/admin/registerClub");
const deleteEventById = require("../controllers/event/deleteEvent");
const updateEventById = require("../controllers/event/updateEvent");
const getAdminInfo = require("../controllers/admin/getAdminInfo");
const updateClubInfoById = require("../controllers/admin/updateClubInfo.js");
const getClubInfoById = require("../controllers/admin/getClubInfoById.js");
const getSuggestionByClub = require("../controllers/admin/getSuggestions.js");
const getEventsByClubId = require("../controllers/admin/getEventsByClub.js");
const getFeedbackByClub = require("../controllers/admin/getFeedbackByClub.js");

router.post("/post-event", imageUpload.uploadBanner("banner"), postEvent);

router.put(
  "/events/update-event/:eventId",
  updateEventById
);
router.delete("/events/:eventId", deleteEventById);
router.get("/events", getEventsByClubId);

router.post("/register-club", imageUpload.uploadLogo("logo"), registerClub);
router.get("/clubs/clubInfo", getClubInfoById);
router.put(
  "/clubs/clubInfo",
  imageUpload.uploadLogo("logo"),
  updateClubInfoById
);

router.get("/adminInfo", getAdminInfo);
router.get("/suggestions", getSuggestionByClub);
router.get("/feedbacks", getFeedbackByClub);

module.exports = router;
