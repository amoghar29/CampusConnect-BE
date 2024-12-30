const express = require("express");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const postEvent = require("../controllers/event/postEvent");

router.post("/:clubName/post-event", upload.single("banner"), postEvent); //admin only

module.exports = router;
