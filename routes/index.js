const express = require("express");
require("dotenv").config({ path: "../.env" });
const feedbackRouter = require("./feedback"); // Feedback Router
const suggestionRouter = require("./suggestion");
const authRouter = require("./auth");
const eventRouter = require("./event");
const clubRouter = require("./club");
const winnerRouter = require("./winner");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/feedback", feedbackRouter);
router.use("/suggestion", suggestionRouter);
router.use("/auth", authRouter);
router.use("/events", eventRouter);
router.use("/club", clubRouter);
router.use("/winners", winnerRouter);

module.exports = router;
