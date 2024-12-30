const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const postEvent = require("../controllers/event/postEvent");
const registerClub = require("../controllers/club/registerClub");

router.post("/:clubName/post-event", upload.single("banner"), postEvent); //admin only
router.post("/register-club", upload.single("logo"), registerClub);
module.exports = router;
