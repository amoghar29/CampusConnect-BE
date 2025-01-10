const router = require("express").Router();
const getFeedbackByClub = require("../controllers/feedback/getFeedbackB");
const {submitUserFeedback} = require("../controllers/feedback/postFeedback");
router.post("/", submitUserFeedback);
router.get("/",getFeedbackByClub)


module.exports = router