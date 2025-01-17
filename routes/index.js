const express = require("express");
require("dotenv").config({ path: "../.env" });
const feedbackRouter = require("./feedback");
const suggestionRouter = require("./suggestion");
const authRouter = require("./auth");
const eventRouter = require("./event");
const clubRouter = require("./club");
const winnerRouter = require("./winner");
const adminRouter = require("./admin");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

router.use("/admin", adminAuth, adminRouter);
router.use("/feedbacks", feedbackRouter);
router.use("/suggestions", suggestionRouter);
router.use("/auth", authRouter);
router.use("/events", eventRouter);
router.use("/clubs", clubRouter);
router.use("/winners", winnerRouter);

module.exports = router;
