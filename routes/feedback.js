const router = require("express").Router();
const getFeedbackByClub = require("../controllers/admin/getFeedbackByClub");
const { submitUserFeedback } = require("../controllers/feedback/postFeedback");
router.post("/", submitUserFeedback);
router.get("/", getFeedbackByClub);

module.exports = router;
