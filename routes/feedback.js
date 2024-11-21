const router = require("express").Router();
const {submitUserFeedback} = require("../controllers/feedback/feedback")
router.post("/", submitUserFeedback);


module.exports = router